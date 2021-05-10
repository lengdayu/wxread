<template>
  <el-carousel :interval="3000" type="card" height="360px">
    <div class="border"></div>
    <el-carousel-item v-for="(item,i) of arrtopall" :key="i">
      <img @click="getIndex(item,i)" :src="item.pic" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  props:['arrtopall'],
  data() {
    return{
    }
  },
  methods:{
    getIndex(item,i){
      this.$router.push({path:'/bookdetails',query:{
        bname:item.bname
      }})
    }
  }
}
</script>
<style>
.border{
  margin-top: 10px;
}
  .el-carousel{
    width: 500px;
  }
  .el-carousel__item{
    width: 250px;
    margin: 0;
  }
</style>