<template>
    <div>
        <div class="logo">
            <img  src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/search_header_logo.02fc8d01.png" alt="">
        </div>
        <div class="container">
            <div class="register">
                <!-- 用户名检查 -->
                <span class="input_title">用户名：</span><input @blur="uname_check" v-model.trim="uname" type="text" placeholder="请输入用户名" maxlength="30">
                <!-- 用户名查重通过与失败的图片提示 -->
                <img v-show="uname_check_right" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E6%AD%A3%E7%A1%AE.png" alt="">
                <img v-show="uname_check_err" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E9%94%99%E8%AF%AF2.png" alt="">
                <!-- 第一次密码检查 -->
                <span class="input_title">用户密码：</span><input @blur="upwd_check" v-model.trim="upwd" type="password" placeholder="请输入用户密码" maxlength="10">
                <img class="upwd_check" v-show="upwd_check_right" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E6%AD%A3%E7%A1%AE.png" alt="">
                <img class="upwd_check" v-show="upwd_check_err" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E9%94%99%E8%AF%AF2.png" alt=""> 
                
                <span class="input_title">再输一次：</span><input @blur="reupwd_check" v-model.trim="reupwd" type="password" placeholder="请重复输入用户密码" maxlength="10">
                <img class="reupwd_check" v-show="reupwd_check_right" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E6%AD%A3%E7%A1%AE.png" alt="">
                <img class="reupwd_check" v-show="reupwd_check_err" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E9%94%99%E8%AF%AF2.png" alt="">
                
                <span class="input_title">手机号：</span><input @blur="phone_check" v-model.trim="phone" type="text" placeholder="请输入手机号" >
                <img class="phone_check" v-show="phone_check_right" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E6%AD%A3%E7%A1%AE.png" alt="">
                <img class="phone_check" v-show="phone_check_err" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E9%94%99%E8%AF%AF2.png" alt="">
                
                <span class="input_title">邮箱：</span><input @blur="email_check" v-model.trim="email" type="text" placeholder="请输入邮箱" class="email_input">
                <img class="email_check" v-show="email_check_right" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E6%AD%A3%E7%A1%AE.png" alt="">
                <img class="email_check" v-show="email_check_err" src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/state/%E9%94%99%E8%AF%AF2.png" alt="">
                
                <!-- 路由跳转待实现 -->
                <button @click="regist" class="button_regist">点击注册</button>

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
export default {
    data() {
        return{
            uname:'',
            uname_check_right:false,//用户名查重  通过   状态 控制输入框旁正确错误图片的显示
            uname_check_err:false,//用户名查重    失败   状态 控制输入框旁正确错误图片的显示
            upwd:'',
            upwd_check_right:false,//用户密码格式  通过   状态 控制输入框旁正确错误图片的显示
            upwd_check_err:false,//用户密码格式    失败   状态 控制输入框旁正确错误图片的显示
            reupwd:'',
            reupwd_check_right:false,//再次输入用户密码格式  通过   状态 控制输入框旁正确错误图片的显示
            reupwd_check_err:false,//再次输入用户密码格式    失败   状态 控制输入框旁正确错误图片的显示
            phone:'',
            phone_check_right:false,//用户手机号格式  通过   状态 控制输入框旁正确错误图片的显示
            phone_check_err:false,//用户手机号格式    失败   状态 控制输入框旁正确错误图片的显示
            email:'',
            email_check_right:false,//用户邮箱格式  通过   状态 控制输入框旁正确错误图片的显示
            email_check_err:false,//用户邮箱格式    失败   状态 控制输入框旁正确错误图片的显示
        }
    },
    methods:{
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
        //用户名不为空，重名检查
        uname_check(){
            var uname=document.getElementsByClassName('uname')[0];
            // console.log('失焦了');
            // console.log(this.uname)
            if(!this.uname){
                this.redmse('用户名不能为空')
                this.uname_check_right=false;
                this.uname_check_err=true;
            }else{
                this.axios.get('/regist/checkuname',{params:{uname:this.uname}}).then(res=>{
                    let checkstate=res.data.code;
                    // console.log(checkstate);
                    if(checkstate==200){
                        this.uname_check_right=true;
                        this.uname_check_err=false;
                    }else if(checkstate==201){
                        this.uname_check_right=false;
                        this.uname_check_err=true;
                        this.redmse('用户名已被注册')
                        this.uname='';
                    }
                })
            }
        },
        //用户密码检查
        upwd_check(){
            this.reupwd_check_right=false;
            let reg=/^[^0-9][a-zA-Z0-9_]+$/;
            let state=reg.test(this.upwd);
            // console.log(state);
            if(state){
                this.upwd_check_right=true;
                this.upwd_check_err=false;
                if(this.reupwd){
                    this.reupwd_check();
                }  
            }else{
                this.upwd_check_right=false;
                this.upwd_check_err=true;
                this.redmse('用户密码必须由数字及字母组成，且必须以字母开头');
                this.upwd='';           
            }
        },
        //再次输入用户密码检查
        reupwd_check(){
            if(this.reupwd){
                if(this.reupwd==this.upwd){
                    this.reupwd_check_right=true;
                    this.reupwd_check_err=false;
                } else {
                    this.reupwd_check_right=false;
                    this.reupwd_check_err=true; 
                    //同时密码框状态也改为初始状态 
                    this.upwd_check_right=false;
                    this.upwd_check_err=false;
                    this.redmse('两次密码输入不一致');
                    this.upwd='';
                    this.reupwd='';                
                }
            }
        },
        //用户手机号检查
        phone_check(){
            let reg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
            let state=reg.test(this.phone);
            if(state){
                this.phone_check_right=true;
                this.phone_check_err=false;
            }else{
                this.phone_check_right=false;
                this.phone_check_err=true;
                this.redmse('手机号格式错误');
                this.phone='';
            }
        },
        //邮箱格式验证
        email_check(){
            let reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            let result=reg.test(this.email);
            if(result){
                this.email_check_right=true;
                this.email_check_err=false;
            }else{
                this.email_check_right=false;
                this.email_check_err=true;
                this.redmse('邮箱格式错误');
                this.email='';
            }
        },
        //用户注册
        regist(){
            if(this.uname && this.upwd && this.phone && this.email){
                let data=this.qs.stringify({
                    uname:this.uname,
                    upwd:this.upwd,
                    avatar:'avatar4.jpg',   
                    phone:this.phone,
                    email:this.email,
                })
                this.axios({
                    method:'post',
                    url:'/regist',
                    data:data
                }).then(res=>{
                    let state=res.data.code;
                    // console.log(state);
                    if(state==200){
                        this.gremse('注册成功');
                        this.$router.push({name:'Login'});
                    }
                });
            }else{
                this.redmse('信息不能为空');
            }
        },
    },
    computed:{

    }
}
</script>
<style scoped>
.email_input{margin-left: 15px;}
.email_check{top: 205px;}
.phone_check{top:152px}
.reupwd_check{top: 100px;}
.upwd_check{top: 50px;}
.register>img{
    position: absolute;
    width: 36px;
    left: 320px;
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
.register>input:nth-child(18){
    margin-bottom: 70px;
}
.register{
    width: 310px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
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