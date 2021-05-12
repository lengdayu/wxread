<template>
    <div class="container">
        <h2 class="header">当前登录管理员账号：{{userinfo.uname}}</h2>
        <el-button v-show="userinfo.uid" @click="loginout" class="loginout" type="success">登出</el-button>
        <div class="button_container">
            <input v-model.trim="iuname" class="search" type="text" placeholder="根据用户名检索"> 
            <input v-model.trim="iuid"  class="search" type="text" placeholder="根据用户id检索">
            <button @click="search" class="button">检索</button>
        </div>
        <div class="commnet_container">
            <div class="com_clo">
                <span class="comment_row comment_pid">序号D</span>
                <span class="comment_row comment_pid">评论ID</span>
                <span class="comment_row comment_uid">用户ID</span>
                <span class="comment_row comment_uname">用户名</span>
                <span class="comment_row comment_details">评论内容</span>
                <span class="comment_row comment_check">操作</span>
            </div>
            <div class="com_clo" v-for="(item,index) of pagecomarr" :key="index">
                <span class="comment_row comment_pid"><span class="middle_span">{{(page-1)*eachpagecount+index+1}}</span></span>
                <span class="comment_row comment_pid"><span class="middle_span">{{item.pid}}</span></span>
                <span class="comment_row comment_uid"><span class="middle_span">{{item.uid}}</span></span>
                <span class="comment_row comment_uname"><span class="middle_span">{{item.uname}}</span></span>
                <span class="comment_row comment_details" style="text-align: left;"><span class="middle_span">{{item.details}}</span></span>
                <a class="comment_row comment_check"><span @click="del(item.pid)" class="middle_span" style="cursor: pointer;">删除</span></a>
            </div>
        </div>
        <div class="foote_page">
            <el-pagination 
                class="pager"
                background
                layout="total, sizes, prev, pager ,next" 
                :page-size="eachpagecount"  
                :page-sizes="[50,100,200]"
                :current-page="page" 
                @current-change='pagechang'
                @size-change="eachpagecountchange"
                :total="total" >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
export default {
    data() {
        return{
            //当前页码
            page:1,
            //每页显示数据量
            eachpagecount:50,
            //数据总条目数
            total:0,
            //请求回来的所有数据
            comarr:[],
            //每页展示的数据，分切上面comarr得到
            pagecomarr:[],
            //输入框双向绑定
            iuname:'',
            iuid:''
        }
    },
    methods:{
        ...mapActions(["changeuserinfo"]),
        //登出
        loginout(){
            this.gremse("退出成功")
            let arr=[];
            this.changeuserinfo(arr);
            sessionStorage.clear();
            setTimeout(()=>{
                this.$router.go(0);
            },1000)
        },
        //搜索框检索
        search(){
            //当输入用户名和用户ID一起查询时
            if(this.iuname==''&&this.iuid==''){
                this.redmse('内容不能为空');
                //当输入用户名和用户ID一起查询时
            }else if(this.iuname!==''&& this.iuid!==''){
                let uname=this.iuname;
                let uid=this.iuid;
                this.axios.get('/admin/searchall',{
                    params:{uname,uid}
                }).then(res=>{
                    // console.log(res.data);
                    this.iuname="";this.iuid='';
                    if(res.data.code==200){
                        this.comarr=res.data.result;
                        this.total=res.data.result.length;
                        this.pagecomarr=this.comarr.slice((this.page-1)*this.eachpagecount,this.page*this.eachpagecount);
                        this.gremse("查询成功");
                    }else if(res.data.code==201){
                        this.redmse("查询失败");
                    }
                })
                //当只输入用户名查询时
            }else if(this.iuname!==""){
                let uname=this.iuname;
                this.axios.get('/admin/searchuname',{
                    params:{uname}
                }).then(res=>{
                    // console.log(res.data);
                    this.iuname="";this.iuid='';
                    if(res.data.code==200){
                        this.comarr=res.data.result;
                        this.total=res.data.result.length;
                        this.pagecomarr=this.comarr.slice((this.page-1)*this.eachpagecount,this.page*this.eachpagecount);
                        this.gremse("查询成功");
                    }else if(res.data.code==201){
                        this.redmse("查询失败");
                    }
                })
            }else if(this.iuid!==""){
                let uid=this.iuid;
                this.axios.get('/admin/searchuid',{
                    params:{uid}
                }).then(res=>{
                    this.iuname="";this.iuid='';
                    if(res.data.code==200){
                        this.comarr=res.data.result;
                        this.total=res.data.result.length;
                        this.pagecomarr=this.comarr.slice((this.page-1)*this.eachpagecount,this.page*this.eachpagecount);
                        this.gremse("查询成功");
                    }else if(res.data.code==201){
                        this.redmse("查询失败");
                    } 
                })
            }
        },
        //切换每页显示数量
        eachpagecountchange(val){
            // console.log("当前页面显示数量变化了，目前显示数量："+val);
            this.eachpagecount=val;
            this.pagecomarr=this.comarr.slice((this.page-1)*val,this.page*val);
        },
        //点击分页跳转
        pagechang(val){
            // console.log("当前页面变化了，处于页面："+val)
            this.page=val;
            this.pagecomarr=this.comarr.slice((val-1)*this.eachpagecount,val*this.eachpagecount);
            
        },
        //删除评论
        del(pid){
            this.axios.delete('/admin/comdel',{
                params:{pid}
            }).then(res=>{
                // console.log(res.data);
                if(res.data.code==200){
                    this.gremse('删除成功');
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                }else if(res.data.code==201){
                    this.redmse('删除失败');
                }
            })
        },
        //页面加载数据渲染
        getData(){
            this.axios.get('/admin',{
                params:{uid:this.userinfo.uid}
            }).then(res=>{
                // console.log(res.data);
                this.comarr=res.data.result;
                this.total=this.comarr.length;
                //切割总数据50条一页渲染到页面
                this.pagecomarr=this.comarr.slice((this.page-1)*this.eachpagecount,this.page*this.eachpagecount);
            })
        },
        //封装el侧边消息框
        redmse(text){
            const h = this.$createElement;
            this.$notify({
            title: '错误',
            message: h('i', { style: 'color: red'}, text)
            });
        },
        gremse(text){
            const h = this.$createElement;
            this.$notify({
            title: '成功',
            message: h('i', { style: 'color: green'}, text)
            });
        },
    },
    mounted(){
        this.getData();
    },
    computed:{
        ...mapState(['userinfo'])
    }
}
</script>
<style scoped>
.pager{
    margin: 40px 0px;   
    text-align: center;
}
.middle_span{
    display: block;
}
.comment_check{
    width: 40px;
    text-decoration: none;
    color: #fff;
}
.comment_details{
    width: 900px;
}
.comment_pid{
    width: 60px;
}
.comment_uname{
    width: 110px;
}
.comment_uid{
    width: 60px;
}
.com_clo{
    width: 100%;
    text-align: center;
    display: flex;
}
.commnet_container{
    margin: 20px 0px;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #4ca4ff;
    color: #fff;    
    /* text-align: center; */
}
.comment_row{
    /* display: block; */
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4ca4ff;
}
.button{
    height: 32px;
    background-color: #4ca4ff;
;
    border: none;
    width: 60px;
    border-radius: 10px;
}
.search{
    border: 1px solid #01eaad;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px 10px;
    margin-right: 30px;
    line-height: 40px;
    outline: #01eaad;
    width: 150px;
    height: 40px;
}
.button_container{
    display: flex;
    align-items: center;
}
.loginout{
    margin:0 0 10px 270px;
}
.header{
    color: #4ca4ff;
}
.container{
    max-width: 1223px;
    margin: 0 auto;
    padding: 15px 20px;
    background-color: rgba(238,240,244,.1);
}
</style>