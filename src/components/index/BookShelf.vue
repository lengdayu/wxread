<template>
    <!-- 用户收藏书架，根据登录状态动态显示 -->
    <div class="bookshelf" v-show="statelogin">
      <div class="bookshelf_title">
        <h2>我的书架</h2>
        <!-- *********** -->
        <!-- 跳转位置预留 -->
        <a href="#"><span>查看我的书架></span></a>
      </div>
      <!-- *********** -->
      <!-- 跳转位置预留 -->
      <div class="bookshelf_pre_body">
        <!-- 我的书架的每本书 -->
         <a href="#" class="bookshelf_pre" v-for="(item,i) of bookshelf" :key="i">
          <img class="bookshelf_img" :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/${bookshelf[i].pic}`">
          <div class="bookshelf_info">
            <span @click="router($event)" class="bookshelf_bookname">{{bookshelf[i].bname}}</span>
            <span @click="routerauthor($event)" class="bookshelf_author">{{bookshelf[i].author}}</span>
          </div>
        </a>
      </div> 
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return{
      bookshelf:[]
    }
  },
  computed:{
    ...mapState(['statelogin']),
    ...mapState(['userinfo'])
  },
  methods:{
    //作者详情页跳转
    routerauthor(event){
      this.$router.push({path:'/authorinfo',query:{
        author:event.target.innerHTML
      }})  
    },
    router(event){
      let bname=event.target.innerHTML;
      this.$router.push({path:'/bookdetails',query:{
        bname
      }})
    },
    loadBookShelf(){
      this.axios.get('/home/bookshelf',{params:{uid:this.userinfo.uid}}).then(result=>{
        this.bookshelf=result.data.result;
        // console.log(result.data);
        })
    }
  },
  mounted(){ 
    //挂在时向后台请求数据
    this.loadBookShelf()
  }
}
</script>
<style scoped>
.bookshelf_author{color: #8a8c90;}
.bookshelf_bookname,.bookshelf_author{display: block;}
.bookshelf_info{
  width: 170px;
  padding: 20px 0 20px 20px;
}
.bookshelf_img{
  display: block;
  width: 68px;height: 98px;
}
.bookshelf_pre{
  display: flex;
  padding: 20px;
  margin-right: 20px;
  margin-top: 20px;
  text-decoration: none;
  color: #eef0f4;
  background-color: rgb(40,41,42);
}
.bookshelf_pre_body{
  display: flex;
  flex-wrap: wrap;
}
.bookshelf_title>a{
  float: right;
  margin-top: 24px;
  font-size: 15px;
  text-decoration: none;
  color: gray;
}
.bookshelf_title>h2{
  font-size: 20px;
  display: inline-block;
  color: azure;
}
.bookshelf{
  padding: 30px;
  background-color:rgb(31, 32, 34);
}
</style>