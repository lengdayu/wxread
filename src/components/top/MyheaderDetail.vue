<template>
    <div class="headdatails" >
        <img @click="home" v-show="!stateinput" class="headlogo" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_header_logo.02fc8d01.png" alt="">
        <!-- 搜索框 -->
        <div class="search_input" >
            <span class="searchim_left" ><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_magnifier.3aaf44ac.png" alt=""></span>
            <input class="search" type="text" placeholder="搜索" @focus="inputfocus" @blur="inputblur">
        </div> 
        <div v-show="!stateinput"  class="nav">
            <span>首页</span><span>|</span>
            <span>传书到手机</span><span>|</span>
            <span>墨水屏手机</span><span>|</span>
            <span>手机版</span><span>|</span>
            <span>微信听书</span><span>|</span>
            <span @click='login' v-show="!statelogin">登录</span>
            <img class="userpic" v-show="statelogin" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/userimage/${userinfo.avatar}`" alt="">
        </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'; 
export default {
    data() {
        return{
        }
    },
    computed:{
        ...mapState(['stateinput']),
        ...mapState(['statelogin']),
        ...mapState(['userinfo']),
    },
    methods:{
        home(){
            this.$router.push({name:'Home'})
        },
        ...mapActions(['changeinputtrue']),
        ...mapActions(['changeinputfalse']),
        ...mapActions(['changeuserinfo']),
        login(){
            this.$router.push({name:'Login'});
        },
        inputfocus(){
            this.changeinputtrue();
        },
        inputblur(){
            this.changeinputfalse();
        }
    }
}
</script>
<style scoped>
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