<template>
    <div>
        <div class="logo">
            <img  src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_header_logo.02fc8d01.png" alt="">
        </div>
        <div class="container">
            <div class="register">
                <span class="input_title">用户名：</span><input  v-model.trim="uname" type="text" placeholder="请输入用户名" maxlength="30">

                <span class="input_title">用户密码：</span><input  v-model.trim="upwd" type="password" placeholder="请输入用户密码" maxlength="10">
              
                <el-button @click="login" class="button_regist">点击登录</el-button>
                <a @click="routertoregist" class="router_regist" href="">未注册？点击注册</a>

            </div> 
        </div>


        <div class="footer">
            <span>Copyright © 1998 - 2021 Tencent. All Rights Reserved.</span>
            <a href="">用户协议</a>
            <span>·</span>
            <a href="">隐私政策</a>
            <span>帮助与反馈</span>
      </div> 
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import  router  from '../router/index'
export default {
    data() {
        return {
            uname:'',
            upwd:''
        }
    },
    methods:{
        routertoregist(){
            this.$router.push({name:'Regist'})
        },
        ...mapActions(['changelogintrue']),
        ...mapActions(['changeuid']),
        ...mapActions(['changeuserinfo']),
        login(){
            if(this.uname && this.upwd){
                //先判读是否是管理员账号，如果是直接跳转管理页面
                this.axios.get('/adminlogin',{
                    params:{uname:this.uname,upwd:this.upwd}
                }).then(res=>{
                    // console.log(res.data);
                    //如果密码正确能得到UID
                    if(res.data.code==200){
                        //*********管理员登录************/
                        //如果UID=1，那么跳转管理员页面
                        if(res.data.result[0].uid==1){
                            this.changeuserinfo(res.data.result[0]);
                            window.sessionStorage.setItem('userinfo',JSON.stringify(res.data.result[0]))
                            this.$router.push({name:'Admin'}); 
                        }

                        //*********普通用户登录************/
                        //如果不是则普通用户正常登录,跳转普通页面
                        else if(res.data.result[0].uid!=1){
                        //如果不是则正常登录跳转首页
                        this.axios.get('/login',{
                            params:{uname:this.uname,upwd:this.upwd}
                        }).then(res=>{
                            // console.log(res);
                            let loginstate=res.data.code;
                            if(loginstate==200){
                                //更新vuex中的用户登录状态，用户id，用户信息
                                this.changelogintrue(true);
                                let arr=res.data.result[0];
                                // this.changeuid(arr.uid);
                                this.changeuserinfo(arr);
                                window.sessionStorage.setItem('userinfo',JSON.stringify(arr))
                                //在浏览器中存储状态
                                this.changelogintrue(true);
                                window.sessionStorage.setItem('islogin',true);
                                const h = this.$createElement;
                                    this.$notify({
                                    title: '成功',
                                    message: h('i', { style: 'color: green;'}, '登录成功')
                                });
                                // console.log(this.userinfo);
                                this.$router.push({name:'Home'});
                            }else if(loginstate==201){
                                const h = this.$createElement;
                                    this.$notify({
                                    title: '错误',
                                    message: h('i', { style: 'color: red;'}, '登录失败')
                                });
                                // this.$message.err('用户名或密码错误');
                                    this.uname='';
                                    this.upwd='';
                                }
                            })
                        }
                    }else {
                        const h = this.$createElement;
                            this.$notify({
                            title: '错误',
                             message: h('i', { style: 'color: red;'}, '登录失败')
                        });
                        this.uname='';
                        this.upwd='';
                    }
                })


            }else{
            const h = this.$createElement;
                this.$notify({
                title: '错误',
                message: h('i', { style: 'color: red;'}, '信息不能为空')
                });
            //    this.$message.err('信息不能为空');
            }
        },
    },
    computed:{
        ...mapState(['statelogin']),
        ...mapState(['uid']),
        ...mapState(['userinfo']),
    }
}
</script>
<style scoped>
.router_regist{
    text-decoration: none;
    font-size: 16px;
    color: gray;
    position: absolute;
    top: 120px;
    left: 180px;
}
input{
    margin-bottom: 20px;
    width: 200px;
    height: 30px;
    padding-left: 10px;
    border: 0;
    border-radius: 26px;
    font-size: 16px;
    color: #eef0f4;
    outline: none;
    background-color: rgba(238,240,244,.1);
    background-repeat: no-repeat;
}
.button_regist{
    width: 100px;
    height: 35px;
    color: #eef0f4;
    background-color: rgba(238,240,244,.1);
    border: none;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 50px;
    cursor: pointer;
}
.input_title{
    display: inline-block;
    margin-top: 5px;
    width: 80px;
    color: #eef0f4;
}
.register>input:nth-child(4){
    margin-bottom: 50px;
}
.register{
    width: 310px;
    height: 150px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
}
.logo{
    display: block;
    
    margin-left: 45%;
    margin-top: 100px;
}
.container{
    display: flex;
    margin: 0 auto;
    margin-top:100px;
    box-sizing: border-box;
    padding: 20px 20px 20px 50px;
    max-width: 1332px;
    background-color: #1f2022;;
}
.footer>a{
  display: inline-block;
  text-decoration: none;
  margin-right: 10px;
  color: #8a8c90;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
}
.footer>span{
  display: inline-block;
  margin-right: 10px;
}
.footer{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1332px;
  margin-top: 80px;
  padding: 0 20px 20px 20px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #8a8c90;
  line-height: 13px;
}
</style>