<template>
    <div class="topcontainer">
      <!-- 排行榜 -->
      <div class="top">
        <!-- 飙升榜 -->
        <div class="top_family">
          <div class="topheader"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/ranklist.rising.chart_title.d0fV1Wskta.png" alt=""></div>
          <span class="topheader_name" style="color:#F75B9A">最近一周热度上涨最快的出版书</span>
          <hr>
          <!-- 飙升榜单内容 -->
          <div class="top_body">
            <!-- 飙升榜的每本书 -->
            <a  class="top_family_a"  v-for="(item,i) of arrtopfast" :key='i'>
              <div class="bookdetails">
                  <div class="bookdetails_img">
                    <img :src="item.pic" alt="">
                  </div>
                  <div class="bookdetails_info">
                    <span class="span_pointer" @click="router($event)">{{item.bname}}</span>
                    <span @click="routerauthor($event)">{{item.author}}</span>
                  </div>
              </div>
              <hr>
            </a>  
          </div>
        </div>
        <!-- 新书榜 -->
        <div class="top_family">
          <div class="topheader"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/ranklist.newbook.chart_title.46TfWH1fmU.png" alt=""></div>
          <span class="topheader_name" style="color:#FF6F3C">最近 30 天上线的热门出版书</span>
          <hr>
          <!-- 新书榜单内容 -->
          <div class="top_body">
            <!-- 榜单中的每本书 -->
            <a  class="top_family_a" v-for="(item,i) of arrtopnew" :key='i'>
              <div class="bookdetails">
                  <div class="bookdetails_img">
                    <img :src="item.pic" alt="">
                  </div>
                  <div class="bookdetails_info">
                    <span class="span_pointer" @click="router($event)">{{item.bname}}</span>
                    <span @click="routerauthor($event)">{{item.author}}</span>
                  </div>
              </div>
              <hr>
            </a>           
          </div>
        </div>
        <!-- 总榜 -->
        <div class="top_family">
          <div class="topheader"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/ranklist.all.chart_title.Ck2o3M5aVF.png" alt=""></div>
          <span class="topheader_name" style="color:#DBC79C;">微信读书用户最喜爱的书籍</span>
          <hr>
          <!-- 总榜榜单内容 -->
          <div class="top_body">
            <!-- 榜单中的每本书 -->
            <a  class="top_family_a" v-for="(item,i) of arrtopall" :key='i'>
              <div class="bookdetails">
                  <div class="bookdetails_img">
                    <img :src="item.pic" alt="">
                  </div>
                  <div class="bookdetails_info">
                    <span class="span_pointer" @click="router($event)">{{item.bname}}</span>
                    <span @click="routerauthor($event)">{{item.author}}</span>
                  </div>
              </div>
              <hr>
            </a>
          </div>
        </div>
        <!-- 男生榜 -->
        <div class="top_family">
          <div class="topheader"><img src="https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/home/ranklist.novel_male_series.chart_title.kNLNVq8D86.png" alt=""></div>
          <span class="topheader_name" style="color:#817CF2;">最近更新的热门男生小说</span>
          <hr>
          <!-- 男生榜单内容 -->
          <div class="top_body">
            <!-- 榜单中的每本书 -->
            <a  class="top_family_a"  v-for="(item,i) of arrtopman" :key='i'>
              <div class="bookdetails">
                  <div class="bookdetails_img">
                    <img :src="item.pic" alt="">
                  </div>
                  <div class="bookdetails_info">
                    <span class="span_pointer" @click="router($event)">{{item.bname}}</span>
                    <span @click="routerauthor($event)">{{item.author}}</span>
                  </div>
              </div>
              <hr>
            </a>
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
      arrtopfast:[],
      arrtopnew:[],
      arrtopall:[],
      arrtopman:[]
    }
  },
  computed:{
    ...mapState(['islogin'])
  },
  methods:{
    //给父组件home传参
    sendval(){
      this.$emit('getarrtopall',this.arrtopall);
      console.log("已发送给父组件")
    },
    //跳转作者详情页
    routerauthor(event){
      this.$router.push({path:'/authorinfo',query:{
        author:event.target.innerHTML
      }})
    },
    router(event){
      let bname=event.target.innerHTML;
      this.$router.push({path:'/bookdetails',query:{
        bname:bname
      }})
    },
    //飙升榜数据请求
    loadtopfast(){
      this.axios.get('/home/topfast').then(result=>{
        // console.log(result);
        [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,...this.others]=result.data;  
        this.arrtopfast=[this.p1,this.p2,this.p3,this.p4,this.p5,this.p6];
        this.arrtopfast.forEach(item=>{
          if(item.pic){
            item.pic=`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/`+item.pic;
          }
        })
      })
    },
    //新书榜数据请求
    loadtopnew(){
      this.axios.get('/home/topnew').then(result=>{
        // console.log(result);
        [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,...this.others]=result.data;  
        this.arrtopnew=[this.p1,this.p2,this.p3,this.p4,this.p5,this.p6];
        this.arrtopnew.forEach(item=>{
          if(item.pic){
            item.pic=`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/`+item.pic;
          }
        })
      })
    },
    //总榜数据请求
    loadtopall(){
      this.axios.get('/home/topall').then(result=>{
        // console.log(result);
        [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,...this.others]=result.data;  
        this.arrtopall=[this.p1,this.p2,this.p3,this.p4,this.p5,this.p6];
        this.arrtopall.forEach(item=>{
          if(item.pic){
            item.pic=`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/`+item.pic;
          }
        })
        this.sendval()
      })
    },
    //男生榜数据请求
    loadtopman(){
      this.axios.get('/home/topman').then(result=>{
        // console.log(result);
        [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,...this.others]=result.data;  
        this.arrtopman=[this.p1,this.p2,this.p3,this.p4,this.p5,this.p6];
        this.arrtopman.forEach(item=>{
          if(item.pic){
            item.pic=`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/`+item.pic;
          }
        })
      })
    }
  },
  mounted(){ 
    //挂在时向后台请求数据
    //总榜数据请求
    this.loadtopfast(),
    this.loadtopnew(),
    this.loadtopall(),
    this.loadtopman()
  }
}
</script>
<style scoped>
.span_pointer{
  cursor: pointer;
}
.bookdetails_img>img{
  width: 64px;height: 92px;
}
.bookdetails_info>span{
  display: block;
  cursor: pointer;
}
.bookdetails_info{
  padding: 15px 0 15px 20px;
  font-size: 15px;
}
.bookdetails{
  display: flex;
}
.top_family_a{
  width: 48%;
  display: block;
  text-decoration: none;
  color: #eef0f4;
}
.top_body{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
hr{
  width: 100%;
  border: solid hsla(0,0%,100%,.05);
  border-width: 0 0 1px;
}
.topheader_name{
  width: 204px;height: 18px; 
  font-size: 12px;
  color: #8a8c90;
}
.topheader>img{
  width: 204px;height: 32px;
}
.top_family{
  width: 48%;
  margin-bottom: 22px;
}
.top{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.topcontainer{
  background-color: rgb(31, 32, 34);
  box-sizing: border-box;
  max-width: 1332px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 30px;
}
</style>