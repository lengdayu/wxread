<template>
    <div class="headdatails" >
        <img @click="home" v-show="!stateinput" class="headlogo" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_header_logo.02fc8d01.png" alt="">
        <!-- 搜索框 -->
        <div class="search_input" >
            <span class="searchim_left" ><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_magnifier.3aaf44ac.png" alt=""></span>
            <input v-model="searchinput" class="search" type="text" placeholder="搜索" @focus="inputfocus">
        </div> 
        <button v-show="stateinput" class="x" @click="inputblur">X</button>
        <div v-show="!stateinput"  class="nav">
            <span>首页</span><span>|</span>
            <span>传书到手机</span><span>|</span>
            <span>手机版</span><span>|</span>
            <span>微信听书</span><span>|</span>
            <span @click='login' v-show="!statelogin">登录</span><span v-show="!statelogin">|</span><span v-show="!statelogin" @click="routerRegist">注册</span>
            <img class="userpic" v-show="statelogin" @click="loginoutShow" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/userimage/${userinfo.avatar}`" alt="">
            <span v-show="out" @click="loginout" class="userloginout">退出</span>
        </div>
        <div v-show="stateinput" class="search_result">  
            <div class="result" v-for="(item,i) of searchresult" :key='i'>
              <img :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/${item.pic}`" alt="">
              <div class="search_result_text">
                <span  @click="router($event)">{{item.bname}}</span>
                <span>{{item.author}}</span>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'; 
export default {
    data() {
        return{
            out:false,
            searchresult:[],
            searchinput:'',
        }
    },
    computed:{
        ...mapState(['stateinput']),
        ...mapState(['statelogin']),
        ...mapState(['userinfo']),
    },
    methods:{
        //点击搜索结果跳转
        router(event){
            this.inputblur();
            let bname=event.target.innerHTML;
            this.$router.push({path:'/bookdetails',query:{
            bname
            }})
        },
        //用户登录退出
        loginout(){
            let arrary=[];
            this.out=false;
            this.changelogintrue(false);
            this.changeuserinfo(arrary);
            sessionStorage.clear();
        },
        //点击用户图片显示退出按钮
        loginoutShow(){
            this.out=true;
        },
        routerRegist(){
            this.$router.push({name:'Regist'})
        },
        home(){
            this.$router.push({name:'Home'})
        },
        ...mapActions(['changeinputtrue']),
        ...mapActions(['changeinputfalse']),
        ...mapActions(['changeuserinfo']),
        ...mapActions(['changelogintrue']),
        login(){
            this.$router.push({name:'Login'});
        },
        inputfocus(){
            this.changeinputtrue();
            let search=document.getElementsByClassName("search_input" )[0];
            // search.style="margin-top:183px;"
        },
        inputblur(){
            this.changeinputfalse();
            let search=document.getElementsByClassName("search_input" )[0];
            // search.style="margin-top:8px"
        }
    },
    watch:{
        searchinput(newval,olval){
            if(newval){
                this.axios.get('/bookdetails',{
                params:{searchinput:'%'+newval+'%'}
                }).then(res=>{
                this.searchresult=res.data.result;
                // console.log(this.searchresult);
                })
            }
        }
    }
}
</script>
<style scoped>
.x{
  /* display: block; */
  width: 50px;height: 50px;
  background-color: black;
  border: none;
  color: gray;
  font-size: 30px;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 20px;
}
.search_result_text>span{
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
}
.search_result_text{
  box-sizing: border-box;
  padding: 0 20px;
}
.result>img{
  display: block;
  width: 56px;height: 80px;
}
.result{
  max-width: 420px;
  /* width: 50%; */
  display: flex;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
}
.search_result{
  position: absolute;
  top: 70px;left: 30px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto ;
  max-width: 840px;
  border-radius: 20px;
  background-color: rgba(238,240,244,.12);
  color: #fff;
}
.userloginout{
    position: absolute;
    top: 60px;right: 325px;
    border: 1px solid black;
    border-radius: 5px;
    color: #fff;
    /* background-color: gray; */
}
.userpic{
    display: inline-block;
    width:30px;
    border-radius: 20px;
    margin-left: 18px;
    cursor: pointer;
}
.headdatails span{
    margin-left: 18px;
    font-size: 16px;
    font-weight: 500;
    font-size: 16px;
    color: grey;
    cursor: pointer;
}
.nav{
    display: flex;
    align-items: center;
}
.search{
  max-width: 550px;height: 36px;
  padding: 0 52px;
  box-sizing: border-box;
  border: 0;
  border-radius: 26px;
  font-size: 16px;
  color: #eef0f4;
  outline: none;
  background: rgba(238,240,244,.1);
}
.searchim_left>img{
    position: absolute;
    top: 10px;
    left: 20px;
}
.searchim_left{
    display: inline-block;
    position: relative;
}
.search_input{
    display: flex;
    max-width: 550px;
    padding: 0 10px;
}
.headlogo{
    margin-right: 16px;
    cursor: pointer;
}
.headdatails{
    display: flex;
    max-width: 1120px;
    height: 100%;
    margin: 0 auto;
    height: 72px;
    align-items: center;
    /* border-bottom: 1px solid #eef0f4; */
}
</style>