import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    operation: '',

    Li:{id:1,name:'sy',rank:'p6',online:true},
    Jia:{id:2,name:'liang',rank:'p6',online:true},
    Gou:{id:3,name:'ya',rank:'p6',online:true},
    userCount:3
  },
  mutations: {
    SET_OP: (state, payload) => {
      state.operation = payload
    },

    SET_RANK: (state, payload) => state.Gou.rank = payload,
    SET_ONLINE: (state, payload) => state.Gou.online = false
    //state规定状态，mutations设置改变状态的方法，在Vue组件中通过this.$store.commit('SET_RANK',payload)调用方法
    //payload为传递参数
  },
  actions: {
    //injectee相当于在Vue组件使用this.$store，此时前端应通过this.$store.dispatch('setRank',payload)调用方法
    setRank: (injectee, payload) => injectee.commit('SET_RANK',payload)
  },
  getters:{
    //处理state中的属性值
    simpleHandle:(state)=>{
      let rankP = Number(state.Gou.rank.replace('p',''))
      let salary = Math.pow(2,rankP -5 )*20
      return salary + 'w'
    }
  },
  modules: {
    //存放外部引入的module，这个module是js文件中定义一个对象，内部也是vuex的state、mutations…的模块模式，通过
    //import引入到这里，呈并列关系
  }
})
