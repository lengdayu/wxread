<template>
    <div>
        <myheader-detail></myheader-detail>
        <!-- 书籍信息块 -->
        <div v-show="!stateinput">
            <div class="container">
                <img class="bookpic" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/${pic}`" alt="">
                <div class="bookinfo">
                    <h1 class="bname">{{bname}}</h1><button @click="routerread" class="readstart">开始阅读</button>
                    <span @click="routerauthor($event)" class="author">{{author}}</span>
                    <span class="info">{{info}}</span>
                </div>
            </div>
            <div class="comment_recommend">
                <h1 style="color:#fff">微信读书热力值</h1>
                <div class="recom_container">
                    <div class="recom_number">{{recommended}}</div>
                    <div class="length_container">
                        <span class="recom_title" style="color:#ccc">推荐</span>
                        <div class="recom_length recom_up" ><div class="up_bgc" :style="upwidth"></div></div>
                        <span class="recom_title" style="color:#ccc">不推荐</span>
                        <div class="recom_length recom_down"><div class="down_bgc" :style="downwidth"></div></div>
                    </div>
                </div>
                <div @click="recomup" class="button buttonup">推荐</div>
                <div @click="recomdown" class="button buttondown">不推荐</div>
            </div>
            <!-- 评论块 -->
            <div class="bookcomment">
                <h2 style="color:#fff">精彩点评</h2>
                <div  v-for="(item,i) of commentarr" :key='i' >
                    <span class="commentuname" style="color:#0097ff" >{{commentarr[i].uname}}</span>
                    <span class="commentdetails" style="color:#aaa" >{{commentarr[i].details}}</span>
                    <button style="display:none"  @click="del($event)" class=" data-eachpid" :data-eachpid='item.pid' :plain="true" type="danger" icon="el-icon-delete">删除</button>

                </div>
            </div>
            <!-- 用户评论发表块 -->
            <div class="text_area">
                <h2 style="color:#fff">评论栏</h2>  
                <textarea class="text_input" name="" id="user_comment_area" cols="30" rows="10"></textarea>
                <div class="send_button_container">
                    <el-button class="comment_send" @click="comment_send" type="success">发表评论</el-button>
                </div>

                <!-- <span @click="comment_send" class="comment_send">发表评论</span> -->
            </div>

            <!-- 页脚 -->
            <div class="footer">
                <span>Copyright © 1998 - 2021 Tencent. All Rights Reserved.</span>
                <a href="">用户协议</a>
                <span>·</span>
                <a href="">隐私政策</a>
                <span>帮助与反馈</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return{
            bname:'',
            pic:'10_1.jpg',
            author:'',
            info:'',
            bid:'',
            recommended:'',
            commentarr:[{details:1},{details:1},{details:1}],

            //热力值样式动态绑定,控制width实现进度条展示
            upwidth:'',
            downwidth:'',
            //评论字数显示控制   a标签显示状态
            statemore:false,
            stateless:false,
            //通过用户id  请求后台得到发表评论的pid，用于和页面加载评论时每条数据的pid对比
            //如果通过 说明该评论是用户发送的，显示修改和删除 否则不通过
            //验证的结果
            user_pid:''
        }
    },
    methods:{
        //删除评论
        del(event){
            let nowpid=event.target.getAttribute('data-eachpid');
            // console.log(nowpid);
            this.$http({
                method:'delete',
                url:'/comment/delcomment',
                params:{nowpid}
            }).then(res=>{
                console.log(res);
                if(res.code==201){
                    const h = this.$createElement;
                         this.$notify({
                        title: '错误',
                        message: h('i', { style: 'color: red;'}, '删除失败')
                    });
                }else if(res.code==200){
                    const h = this.$createElement;
                         this.$notify({
                        title: '成功',
                        message: h('i', { style: 'color: red;'}, '删除成功')
                    });
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                    
                }
            })
        },
        //页面加载时根据用户ID向后台请求，该用户的所用的评论的ID
        get_user_commnet_pid(){
            let uid=this.userinfo.uid;
            this.axios.get('/comment/getcommentid',{
                params:{uid}
            }).then(res=>{
                // console.log(res.data);
                //将目前登录用户所用评论的pid保存起来
                this.user_pid=res.data.result;
                //获取到评论的元素
                let comment=document.getElementsByClassName('data-eachpid');
                // console.log(comment);
                // 再依次将pid和user_pid两个数组比较，有一个子元素相同就说明是当前用户的评论
                for(var i=0;i<comment.length;i++){
                    for(var k=0;k<this.user_pid.length;k++){
                        // console.log(comment[i].getAttribute('data-eachpid'));
                        // console.log(this.user_pid[k].pid);
                        if(comment[i].getAttribute('data-eachpid')==this.user_pid[k].pid){
                            // console.log(1);
                            // console.log(comment[i]);
                            comment[i].style.display='block'
                        }
                    }
                }
            })
        },
        //发送评论
        comment_send(){
            let user_comment_area=document.getElementById('user_comment_area');
            // console.log(user_comment_area.value);
            let data=this.qs.stringify({
                bid:this.bid,
                uname:this.userinfo.uname,
                uid:this.userinfo.uid,
                details:user_comment_area.value,
            })
            if(user_comment_area.value!==''){
                this.axios({
                    method:'post',
                    url:'/comment/send',
                    data
                }).then(res=>{
                    // console.log(res);
                    user_comment_area.value='';
                    this.$message({
                        message: '发表成功',
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.go(0);
                        this.get_user_commnet_pid();
                    },1000)

                })
            }else {
                this.$message({
                    message: '不能发表内容为空的评论',
                    type: 'warning'
                });
            }

        },
        //作者详情页跳转
        routerauthor(event){
            this.$router.push({path:'/authorinfo',query:{
                author:event.target.innerHTML
            }})  
        },
        //路由跳转
        routerread(){
            this.$router.push({path:'/readdetails',query:{
                bid:this.bid,
                bname:this.bname
            }})
        },
        //点击推荐不推荐添加或减少热力值
        recomup(){
            //先将热力值截取为整数
            let recommend=parseInt((this.recommended).slice(0,-1))+1;
            let data=this.qs.stringify({
                recommended:recommend,
                bid:this.bid
            });
            if(recommend>=0 && recommend<=100){
                this.axios({
                    method:'put',
                    url:'/bookdetails/recommended',
                    data
                }).then(res=>{
                    //将增加后的热力值更新到页面
                        this.recommended=recommend.toFixed(1)+'%';
                        this.recommend();
                })
            }

        },
        recomdown(){
            //先将热力值截取为整数
            let recommend=parseInt((this.recommended).slice(0,-1))-1;
            let data=this.qs.stringify({
                recommended:recommend,
                bid:this.bid
            })
            if(recommend>=0 && recommend<=100){
                this.axios({
                    method:'put',
                    url:'/bookdetails/recommended',
                    data
                }).then(res=>{
                    //将增加后的热力值更新到页面
                        this.recommended=recommend.toFixed(1)+'%';
                        this.recommend();
                    
                })
            }
        },
        //热力值渲染
        recommend(){
            this.upwidth='width:'+this.recommended;
            this.downwidth='width:'+((100-(this.recommended).slice(0,-1))+'%');
        },
        //2F评论信息
        //评论信息
        loadcomment(){
            //通过书籍编号bid获取到对应的评论内容
            this.axios.get('/comment',{
                params:{bid:this.bid}
            }).then(res=>{
                let arr=res.data.result;
                // console.log(arr);
                this.commentarr=arr;
            //确保页面加载时，先请求到评论的id
            //再请执行验证函数
            this.get_user_commnet_pid();
            })
        },
        //1F书籍信息
        loadbname(){
            this.bname=this.$route.query.bname;
            this.axios.get('/bookdetails/details',{
                params:{bname:this.bname}
            }).then(res=>{
                let arr=res.data.result[0];
                // console.log(arr);
                // this.bname=arr.bname;
                this.author=arr.author;
                this.info=arr.introduction;
                this.pic=arr.pic;
                this.bid=arr.bid;
                this.recommended=arr.recommended.toFixed(1)+'%';
                //调用热力值渲染方法动态控制upwidth downwidth
                if(arr.recommended>=0 && arr.recommended<=100){
                    this.recommend();
                }
            });

        }
    },
    mounted(){
        this.loadbname();
    },
    watch:{
        bid(){
            this.loadcomment();
        },
    },
    computed:{
        ...mapState(['stateinput']),
        ...mapState(['statelogin']),
        ...mapState(['userinfo'])
    }
}
</script>
<style scoped>
.send_button_container{
    width: 80%;
    max-width: 1120px;
    margin: 0 auto;
}

.data-eachpid{
    width: 70px;
    padding:5px;
    margin-top: 5px;
    background-color: #f56c6c;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    /* box-shadow: inset 1px 1px 1px 1px azure ; */
    color: #eee;
}
.comment_send{
    margin: 20px 0;
    margin-left: 88%;
}
.text_input{
    background-color: rgba(238,240,244,.1);
    border: none;
    outline: none;
    display: block;
    margin: 0 auto;
    width: 80%;
    color: rgb(170, 170, 170);
    font-size: 16px;
}
.text_area{
    padding: 20px 40px 40px 40px;
    max-width: 1120px;
    margin: 0 auto;
    border-top: 1px solid #fff;
    background-color: rgba(238,240,244,.1);
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
.buttonup{
    margin:20px 120px 0 30px;
}
.button{
    display: inline-block;
    width: 40%;height: 40px;
    border: 1px solid black;
    background-color: gray;
    border-radius: 15px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}

.up_bgc,.down_bgc{
    width: 50%;
    height: 5px;
    background-color: gray;
}
.commentdetails{
    display: block;
}
.commentuname{
    margin-bottom: 5px;
    margin-top: 20px;
    display: block;
}
.bookcomment{
    padding: 20px 40px 40px 40px;
    max-width: 1120px;
    margin: 0 auto;
    background-color: rgba(238,240,244,.1);
}
.recom_title{
    display: block;
    width: 7%;
}
.recom_length{
    width: 90%;
    border: 1px solid black;
    border-radius: 5px;
    height: 5px;
    background-color: rgba(200,200,200,.1);
    margin-top: 10px;
}
.recom_container{
    display: flex;
}
.length_container{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
}
.recom_number{
    width: 20%;
    font-size: 50px;
    color:#0097ff
}
.comment_recommend{
    padding: 60px 40px 10px 40px;
    max-width: 1120px;
    margin: 0 auto;
    background-color: rgba(238,240,244,.1);   
}

.info{
    color: #8a8c90;
}
.author{
    display: block;
    margin-bottom: 10px;
    color: #0097ff;
    font-size: 18px;
    cursor: pointer;
}
.bname{
    display: block;
    color: #fff;
    margin: 0 0 20px 0 ;
}
.readstart{
    position: absolute;
    top: 10px;
    right: 37px;
    width: 147px;
    height: 58px;
    color: #fff;
    font-size: 18px;
    background-color: #0097ff;
    border: 1px solid black;
    border-radius: 24px;
    cursor: pointer;
}
.bookinfo{
    position: relative;
   box-sizing: border-box;
   padding: 0 0 0 40px; 
}
.bookpic{
    display: block;
    width: 134px;height: 195px;
}
.container{
    display: flex;
    padding: 60px 40px 10px 40px;
    max-width: 1120px;
    margin: 0 auto;
    background-color: rgba(238,240,244,.1);
}
</style>