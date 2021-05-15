<template>
    <div>
        <!-- 首页导航栏 -->
        <div class="navBar" v-show="!stateinput">
            <button>传书到手机</button><span class="navBar_b"></span>
            <button>墨水屏版</button><span class="navBar_b"></span>
            <button>手机屏</button><span class="navBar_b"></span>
            <button>微信听书</button><span class="navBar_b"></span>
            <button  @click='login' v-show="!statelogin">登录</button><span v-show="!statelogin" class="navBar_b"></span>
            <button  @click='regist' v-show="!statelogin">注册</button><span v-show="statelogin" class="navBar_b"></span>
            <img v-show="statelogin" @click="loginoutshow" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/userimage/${userinfo.avatar}`" alt="" >
            <span v-show="out" @click="loginout" class="userloginout">退出</span>
        </div>
        <span class="log" v-show="!stateinput"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_header_logo.02fc8d01.png"></span>
        <!-- 搜索框 -->
        <div class="search_input" >
            <span class="searchim_left" ><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_magnifier.3aaf44ac.png" alt=""></span>
            <input v-model="searchinput" class="search" type="text" placeholder="搜索" @focus="inputfocus" >
            <span class="searchim_right"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_return.0d4e04d8.png" alt=""></span>
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
        <button @click="inputblur" v-show="stateinput" class="x">X</button>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      arr:[],
      searchinput:'',
      //搜索结果
      searchresult:[],
      pic:'10_1.jpg',
      //退出登录按钮
      out:false,
    }
  },
  computed:{
    ...mapState(['statelogin']),
    ...mapState(['stateinput']),
    ...mapState(['userinfo']),
  },
  methods:{
    //退出登录loginout
    loginout(){
      let arrary=[];
      this.out=false;
      this.changelogintrue(false);
      this.changeuserinfo(arrary);
      sessionStorage.clear();
      this.$message({
          message: '退出成功',
          type: 'success'
      });
    },
    //点击显示退出按钮
    loginoutshow(){
      this.out=true;
    },
    //搜索结果跳转；
    router(event){
      this.inputblur();
      let bname=event.target.innerHTML;
      this.$router.push({path:'/bookdetails',query:{
        bname
      }})
    },
    //从VUEX中调取搜索框状态修改函数
    ...mapActions(['changeinputtrue','changeinputfalse','changelogintrue','changeuserinfo']),
    inputfocus(){
      // console.log("聚焦了");
      // console.log(this.pic);
      this.changeinputtrue();
      let search=document.getElementsByClassName("search_input" )[0];
      search.style="margin-top:183px"
    },
    inputblur(){
      // console.log("失焦了");
      this.changeinputfalse();
      let search=document.getElementsByClassName("search_input" )[0];
      search.style="margin-top:48px"
    },
    regist(){
      this.$router.push({name:'Regist'});     
    },
    login(){
      this.$router.push({name:'Login'});
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
.userloginout{
  color: #fff;
  font-size: 16px;
  opacity: .7;
  position: absolute;
  top: 70px;
  cursor: pointer;
}
.x{
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
  width: 50%;
  display: flex;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
}
.search_result{
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto ;
  max-width: 840px;
  border-radius: 20px;
  background-color: rgba(238,240,244,.12);
  color: #fff;
}
body,div,span,button,input{margin: 0;padding: 0;}
/* 顶部导航栏 */
.navBar{  
  display: flex; justify-content: flex-end;
  margin: 0 auto;
  max-width: 1332px;
  height: 72px;
  padding: 30px 30px 0 30px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  position: relative;
}
.navBar>button{
  height: 16px;
  border: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  background: none;
  opacity: .7;
  cursor: pointer;
}
.navBar>img{
  position: absolute;
  top:25px;
  width: 30px;height: 30px;
  border-radius: 50%;
}
.navBar_b{
  width: 1px;height: 16px;
  margin:0 18px 0 18px;
  background-color: #fff;
  opacity: .3;
}
.log{
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 36px;
    background-size: 100%;
    text-align: center;
    margin-top: 45px;
}
/* 搜索框 */
.search_input{
    position: relative;
    width: 80%;
    max-width: 840px;
    margin: 48px auto 0;
}
.search_input>input{
  width: 100%;
  padding: 0 52px;
  box-sizing: border-box;
  height: 52px;
  border: 0;
  border-radius: 26px;
  font-size: 16px;
  color: #eef0f4;
  outline: none;
  background: rgba(238,240,244,.1);
}
.searchim_left{
    content: "";
    position: absolute;
    top: 16px;
    left: 20px;
    width: 20px;
    height: 20px;
}
.searchim_right{
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
}
</style>