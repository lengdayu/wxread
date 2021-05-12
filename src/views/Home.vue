<template>
  <div>
    <my-header></my-header>
    <div v-show="!stateinput">
      <div class="container">
        <book-shelf></book-shelf> 
        <!-- 猜你喜欢 -->
        <div class="swiper_container">
          <swiper class="swiper" :arrtopall='arrtopall'></swiper>
        </div>
      </div>
      <top v-on:getarrtopall="getarrtopall"></top>
      <home-topclass></home-topclass>
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
import MyHeader from '../components/index/MyHeader'
import BookShelf from '../components/index/BookShelf'
import Top from '../components/index/Top'
import HomeTopclass from '../components/index/HomeTopclass'
import {mapState} from 'vuex'
//引入swiper轮播图组件
import Swiper from '../components/index/swiper'

export default {
  components:{MyHeader,BookShelf,Top,HomeTopclass,Swiper},
  data() {
    return{
      arrtopall:[],
    }
  },
  computed:{
    ...mapState(['stateinput'])
  },
  methods:{
    getarrtopall(sendval){
      console.log('已取到子组件的值')
      this.arrtopall=sendval;
      // console.log(this.arrtopall);
    }
  }
}
</script>

<style scoped>
.swiper_container{
  background-color: rgb(40,41,42);
}
.swiper{
  margin: 0 auto;
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
.container{
  max-width: 1332px;
  margin: 0 auto;
  margin-top: 140px;
  background-color:black;
}
</style>
