<template>
    <div class="home_footer">
        <div class="topclass_title">
            <h2>分类榜单</h2>
            <hr>
        </div>
          <div class="topclass">
              <!-- 动态生成榜单分类 -->
              <div class="topclass_container" v-for="i of 11" :key="i">
                  <a @click="router" href="" v-cloak>{{arr[i].tname}}·{{arr[i].total}}本</a>
                  <hr>
              </div>

              <!-- 不动态生成的列表 -->
              <div class="topclass_container">
                  <a @click="router" href="">查看全部·{{arr.length}}个</a>
                  <hr>
              </div>
          </div>

    </div>
</template>
<script>
export default {
    data() {
        return{
          arr:[{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99},{tname:'xx',total:99}]
        }
    },
    methods:{
        loadpage(){
            this.axios.get('/home/toptitle').then(result=>{
                // console.log(result.data);
                this.arr=result.data;
            })
        },
        router(){
          this.$router.push({name:'TopDetails'})
        }
    },
    mounted(){
        this.loadpage();
    }
}
</script>
<style scoped>
.home_footer{
  background-color: rgb(31, 32, 34);
}
.topclass_container>a{
  display: block;
  padding: 18px 0 18px 12px;
  margin-left: -12px;
  text-decoration: none;
  color: #f0ffff;
}
.topclass_container{
  display: flex;
  width: 25%;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-right:0 10px;
}
.topclass{
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
.topclass_title>hr{
  width: 100%;
}
hr{
  width: 80%;
  border: solid hsla(0,0%,100%,.07);
  border-width: 0 0 1px;
  margin: 0;
}
.topclass_title{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.home_footer{
  max-width: 1332px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 30px 0 30px;
  color: #f0ffff;
}
</style>