<template>
    <div class="readcontainer">
        <div class="read_head">
            <div class="read_head_container">
                <img class="read_log" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookcontainer_title/reader_top_home.37ef15b1.png" alt="">
                <span @click="back" class="back">回到主页</span>
                <span class="head_bname">{{bname}}</span>
            </div>
            <div class="read_head_container">
                <span @click="add" class="head_bookshelf">添加到书架</span>
                <span><img class="head_pic" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/userimage/${userinfo.avatar}`" alt=""></span>
            </div>
        </div>
        <div class="read_details">
            <span class="datails_name" v-show="!end">第{{nowpage}}章 {{datails_name}}</span>
            <span class="datails_text">{{datails_text}}</span>
        </div>
        <a href="#" v-show="!end" @click="next" class="botoom_next">下一章</a>
        <a href="" v-show="end" @click="backhome" class="botoom_home">回到主页</a>
        <!-- 读书工具栏 -->
        <div class="gongju">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return{
            //路由传参带过来值
            bid:'',
            bname:'',
            //书籍内容信息
            datails_name:'',
            datails_text:'',
            nowpage:1,
            //总章节数
            pagecount:'',
            arr:'',
            //控制文章结尾下一章和回到主页的动态显示
            end:false,
        }
    },
    methods:{
        //回到首页
        back(){
            this.$router.push({name:'Home'});
        },
        //添加到书架
        add(){
            let data=this.qs.stringify({
                bsid:'',
                uid:this.userinfo.uid,
                bid:this.bid
            })
            this.axios({
                method:'post',
                url:'/shujiaadd',
                data:data
            }).then(res=>{
                alert('添加成功')
            })
        },
        //回到主页
        backhome(){
            this.$router.push({name:'Home'});
        },
        //下一章跳转
        next(){
            if(this.nowpage<this.pagecount){
                this.nowpage++;
                this.datails_name=this.arr[this.nowpage-1].contain_name;
                this.datails_text=this.arr[this.nowpage-1].contain;
            }else {
                this.datails_text='全文完';
                this.end=true;
            }

        },
        loadpage(){
            this.bid=this.$route.query.bid;
            this.bname=this.$route.query.bname;
            this.axios.get('/readdetails').then(res=>{
                let arr=res.data.result;
                // console.log(arr);
                this.arr=arr;
                this.datails_name=arr[this.nowpage-1].contain_name;
                this.datails_text=arr[this.nowpage-1].contain;
                this.pagecount=arr.length;
            })
        },
    },
    mounted(){
        this.loadpage();
    },
    computed:{
        ...mapState(['userinfo']),
    }
}
</script>
<style scoped>
.back{
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
}
.botoom_next,.botoom_home{
    display: block;
    width: 150px;height: 40px;
    margin:20px 0;
    font-size: 25px;
    color: #fff;
    background-color: gray;
    border: 1px solid black;
    border-radius: 10px;  
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    cursor: pointer;
    text-decoration: none;
}
.datails_name{
    text-align: center;
}
.datails_text,.datails_name{
    display: block;
    margin:20px 0;
    font-size: 25px;
    color: #fff;
    opacity: .7;
}
.head_pic{
    display: inline-block;
    width: 24px;
    border-radius: 10px;
}
.head_bookshelf{
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
}
.head_bname{
    display: inline-block;
    margin-left: 30px;
}
.read_log{
    display: inline-block;
}
.read_head_container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.read_head span{
    line-height: 18px;
}
.read_head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    opacity: .7;
    font-size: 18px;
    font-weight: 700;
    box-sizing: border-box;
    padding: 25px 0;
    border-bottom: 1px solid #fff;
}
.readcontainer{
    max-width: 760px;
    box-sizing: border-box;
    padding: 0 80px 40px 80px;
    margin: 0 auto;
    margin-bottom: 50px;
    background-color: #1f2022;
}
</style>