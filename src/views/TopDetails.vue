<template>
    <div>
        <myheader-detail></myheader-detail>
        <div class="top_container" v-show="!stateinput">
            <div class="top_title">
                <ul>
                    <!-- <li class="top_pic"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/toplist/category_rising_white.a7b8ac5b.png" alt=""></li>
                    <li class="top_pic"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/toplist/category_newbook_white.ac8f7617.png" alt=""></li>
                    <li class="top_pic"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/toplist/category_all_white.c8e042ea.png" alt=""></li>
                    <li class="top_pic"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/toplist/category_novel_white.d97b212b.png" alt=""></li> -->
                    <li @click="router($event)" v-for="(item,i) of arr" :key='i' class="top_class">{{item.tname}}榜</li>
                </ul>
            </div>
            <div class="top_info">
                <h2>{{top_info_title}}榜</h2>
                <div v-for="(item,i) of arrdetails" :key="i" class="top_detail">
                    <span class="top_detail_i">{{i+1}}</span>
                    <img class="detailpic" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/${item.pic}`" alt="">
                    <div class="top_detail_bottom">
                        <span @click="routerbook($event)" class="span_banme">{{item.bname}}</span>
                        <span class="span_author">{{item.author}}</span>
                        <span class="span_recommended">热力值：{{item.recommended}}</span>
                        <span class="span_introduction">{{item.introduction.length>330 ? item.introduction.slice(0,330)+' . . . ' : item.introduction}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return{
            arr:[],
            router_title:'',
            top_info_title:'历史',
            arrdetails:[],
        }
    },
    methods:{
        //路有跳转书籍详情页
        routerbook(event){
            this.$router.push({path:'/bookdetails',query:{
                bname:event.target.innerHTML
            }})
        },
        router(event){
            //获取到事件源对象在获取到对应的innerHTML，路由跳转时携带
            this.router_title=event.target.innerHTML.slice(0,-1);
            this.top_info_title=this.router_title;
            this.loaddetail();
        },
        loadpage(){
            this.axios.get('/topclass').then(res=>{
                // console.log(res.data);
                this.arr=res.data.result;
            })
        },
        loaddetail(){
            this.axios.get('/bookdatails',{params:{
                tname:this.top_info_title
            }}).then(res=>{
                this.arrdetails=res.data.result;
            })
        }

    },
    mounted(){
        this.loadpage();
        this.loaddetail();
    },
    computed:{
        ...mapState(['stateinput'])
    },
}
</script>
<style scoped>
.span_banme{
    font-size: 16px !important;
    color: #eef0f4 !important;
    cursor: pointer;
}
.top_detail_bottom>span{
    display: block;
    margin-top: 5px;
    font-size: 13px;
    color: gray;
}
.top_detail_bottom{
    max-width: 740px;
    box-sizing: border-box;
    padding: 0 0 20px 20px;
}
.top_detail_i{
    display: block;
    width: 50px;height: 156px;
    text-align: center;
    line-height: 156px;
}
.detailpic{
    display: block;
    width: 128px;height: 176px;
}
.top_detail{
    display: flex;
    box-sizing: border-box;
    padding: 20px 0;
}
.top_info>h2{
    box-sizing: border-box;
    padding: 10px 70px 20px 70px;
    border-bottom: 1px solid rgba(255,255,255,.1);
}
.top_info{
    width: 80%;
    color: #eef0f4;
}
.top_pic{
    list-style: none;  
}
.top_class{
    margin: 30px 0;
    list-style: none;
    color: #eef0f4;
}
.top_title{
    width: 20%;
    border-right: 1px solid rgba(255,255,255,.1);
}
.top_container{
    display: flex;
    max-width: 1120px;
    margin: 0 auto;
    border-top: 1px solid rgba(255,255,255,.1);
}
ul{
    margin: 0;
}
li{
    display: block;
    margin: 20px 0;
    font-size: 18px;
    cursor: pointer;
}
</style>
