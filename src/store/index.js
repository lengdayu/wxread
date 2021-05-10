import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    statelogin:sessionStorage.getItem('islogin') ? true : false,//登录状态
    uname_check_right:false,//用户名查重  通过   状态 控制输入框旁正确错误图片的显示
    uname_check_err:false,//用户名查重    失败   状态 控制输入框旁正确错误图片的显示
    stateinput:false,//搜索框状态
    // uid:'',//用户id
    userinfo: sessionStorage.getItem('userinfo') ? JSON.parse(sessionStorage.getItem("userinfo")) : '',
    // userinfo:{
    //   avatar:'avatar1.jpg',
    //   bid:'',
    //   email:'',
    //   phone:'',
    //   sex:0,
    //   shelfid:'',
    //   uid:'',
    //   uname:'',
    //   upwd:''
    // }
    //用户信息
  },
  mutations: {
    //登录状态修改
    setStatelogin(state,nowstate){
      state.statelogin=nowstate
    },
    // //登录id修改
    // setuid(state,nowuid){
    //   state.uid=nowuid;
    // },
    //登陆用户信息修改
    setuserinfo(state,nowinfo){
      state.userinfo=nowinfo;
    },
    //首页搜索框状态修改
    setStateinput(state,nowstate){
      state.stateinput=nowstate
    }
  },
  actions: {
    //当前登录用户信息跟新
    changeuserinfo(context,arr){
      context.commit('setuserinfo',arr);
    },
    // //当前登录用户id更新
    // changeuid(context,uid){
    //   context.commit('setuid',uid);
    // },
    //修改登录状态
    changelogintrue(context,state){
      context.commit('setStatelogin',state);
    },
    //搜索框状态setStateinput切换为true
    changeinputtrue(context){
      context.commit('setStateinput',true)
    },
    //搜索框状态setStateinput切换为false
    changeinputfalse(context){
      context.commit('setStateinput',false)
    }
  },
  modules: {
  }
})
