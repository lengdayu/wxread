<template>
<!-- 整个页面大div -->
    <div>
      <myheader-detail></myheader-detail>
        <!-- 上面第一个div -->
        <div class="container">
            <div>
                <h1>{{author}}</h1>
            </div>
            <div >
                <p class="detail" >
                {{authorinfo.intro}}
                </p>
            </div>
        </div>
        <!-- 下面整个div -->
      <div class="bookAbout" v-for="(item,i) of arr" :key="i">
        <!-- 第一个开始 -->
        <div class="bookList" >
            <div class="bookImg">
              <img :src="`https://readpic-1305756746.cos.ap-shanghai.myqcloud.com/bookimage/${pic}`">
            </div>
            <div class="bookList-item">
                    <p @click="routerbook($event)">{{item.bname}}</p>   
                    <a href="#"></a>
                    <span>{{item.author}}</span><br>
                    <span>推荐值{{item.recommended}}</span>
                    <div class="bookEvery"> 
                      {{item.introduction}}
                    </div>
            </div>       
        </div> 
        <!-- 第一个结尾 -->
        
     </div>    
    </div>  
</template>
<script>
import MyheaderDetail from '../components/top/MyheaderDetail.vue';
export default {
  components: { MyheaderDetail },
  data(){
    return{
      arr:[],
      pic:'10_1.jpg',
      author:'烽火戏诸侯',
      authorinfo:[],
    }
  },
  methods:{
    //跳转到书籍详情页
    routerbook(event){
      this.$router.push({path:'/bookdetails',
        query:{bname:event.target.innerHTML}
      })
    },
    loadPage(){
      //获取路由跳转传输过来的作者名
      this.author=this.$route.query.author;
      //请求作者信息
      this.axios.get('/authorinfo',{
        params:{author:this.author}       
      }).then(res=>{
        // console.log(res.data);
        this.authorinfo=res.data.result[0];
      })
      //请求作者作品
      this.axios.get("/authordetails",{
        params:{
          author:this.author
        }
      }).then(result=>{
        this.arr=result.data.result;
        // console.log(this.arr);
        this.pic=this.arr[0].pic
      })
    } 
  },
  mounted(){
    this.loadPage();
  }
}
</script>
<style scoped>

.bookEvery{
  font-size: 18px;
}

span{
  padding: 4px;
  font-size: 14px;
}
.bookList-item p{
  cursor: pointer;
}
.bookList-item{
    font-size: 12px;
    color: #8a8c90 ;
    box-sizing: border-box;
    padding: 0 20px;
}
.bookImg{
  width: 180px;
}
img{    
    height: 100%;
    margin-left: 30px;
}
.bookList{
    display: flex;
    height: 180px;
    padding: 20px;
}

.bottom {
  border-radius: 0;
  border: solid hsla(0, 0%, 100%, 0.05);
  border-width: 1px 0 0;
}
.container {
  padding:  10px 20px;
}

h1 {
  color: #eef0f4;
  text-align: left;
  font-size: 22px;
}

p {
  color: #eef0f4;
  text-align: left;
  font-size: 18px;
}

.detail {
  text-align: left;
  font-size: 18px;
  color: #8a8c90;
}
</style>