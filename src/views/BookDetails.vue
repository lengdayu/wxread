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
                <div v-for="(item,i) of 3" :key='i'>
                    <span class="commentuname" style="color:#ddd" >{{commentarr[i].uname}}</span>
                    <span class="commentdetails" style="color:#aaa">{{commentarr[i].details.length>200 ? commentarr[i].details.slice(0,250)+'...'  : commentarr[i].details}}</span>
                    <!-- <a  v-show="statemore" class="statea" href="">查看更多</a>
                    <a  v-show="stateless" class="statea" href="">收起</a> -->
                </div>
                <a @click="routercommentall()" class="morecomment">查看更多评论</a>
            </div>
            <!-- 版权块 -->
            <div class="publish">
                <h2 class="publish_title">版权信息</h2>
                <h2>书名：{{bname}}</h2>
                <h2>作者：{{author}}</h2>
                <h2>译者：{{translator}}</h2>
                <h2>出版社：{{pubname}}</h2>
                <h2>出版时间：2002年7月14日</h2>
                <h2>ISBN：9787508660752</h2>
                <h2>{{pubdetail}}</h2>
                <h2>版权所有·侵权必究</h2>
            </div>
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
import { mapState } from 'vuex'; 
export default {
    data() {
        return{
            bname:'',
            pic:'10_1.jpg',
            author:'',
            info:'',
            bid:'',
            recommended:'',
            comment:'',
            commentarr:[{details:1},{details:1},{details:1}],

            //热力值样式动态绑定,控制width实现进度条展示
            upwidth:'',
            downwidth:'',
            //出版详情
            translator:'无',
            pubname:'',
            pubdetail:'',
            //评论字数显示控制   a标签显示状态
            statemore:false,
            stateless:false,
        }
    },
    methods:{
        //评论页面跳转
        routercommentall(){
            this.$router.push({path:'/commentall',query:{
                bname:this.bname
            }})        
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
        //出版信息
        loadpublish(){
            this.axios.get('/publish',{
                params:{bid:this.bid}
            }).then(res=>{
                // console.log(res.data);
                let arr=res.data.result[0];
                this.pubname=arr.pubname;
                this.pubdetail=arr.pubdetail;
                if(arr.translator){
                    this.translator=arr.translator;
                };
            })
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
                this.loadpublish();
            });

        }
    },
    mounted(){
        this.loadbname();

    },
    watch:{
        bid(){
            this.loadcomment();
        }
    },
    computed:{
        ...mapState(['stateinput']),
        ...mapState(['statelogin']),
    }

}
</script>
<style scoped>
.statea{
    color: red;
    text-decoration: none;
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
.publish_title{
    text-align: center;
    font-size: 40px;
}
.publish{   
    padding: 10px 40px 10px 40px;
    max-width: 1120px;
    margin: 0 auto;
    background-color: rgba(238,240,244,.1); 
    color: #fff;  
    text-align: center;
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
.morecomment{
    color: #0097ff;
    cursor: pointer;
}
.up_bgc,.down_bgc{
    width: 50%;
    height: 5px;
    background-color: gray;
}
.commentdetails{
    display: block;
    margin-bottom: 25px;
}
.commentuname{
    margin-bottom: 5px;
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