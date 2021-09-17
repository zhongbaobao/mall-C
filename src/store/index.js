import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: true,
    goodList: [],
    type: null,
    size: 5,
    counterMap:{}, //本地值的存储
  },
  mutations: {
    storageChange(state,{ id , value }){
      if(state.counterMap[id]){
        if(value === -1 && state.counterMap[id] === 1){
          Vue.delete(state.counterMap,id)
        }else{
          Vue.set(state.counterMap,id,state.counterMap[id] + value)
        }
      }else{
        Vue.set(state.counterMap,id,1)
      }
      localStorage.setItem('goods',JSON.stringify(state.counterMap))
    },
    setcounterMap(state,map){
      state.counterMap = map
    },
    setSideList(state, list) {
      state.sideList = list
    },
    setshowContent(state, bool) {
      state.showContent = bool
    },
    setgoodList(state, list) {
      state.goodList = [...state.goodList, ...list]
    },
    resetgoodList(state) {
      state.goodList = [];
    },
    setType(state, type) {
      state.type = type
    }
  },
  actions: {
    async getSideList({
      commit
    }, type) {
      commit('setshowContent', false)
      const value = await api.getSideList(type)
      commit('setSideList', value)
      commit('setshowContent', true)
    },
    async getgoodList({
      commit,
      state
    }, options) {
      const {
        page,
        sortType
      } = options;
      const type = options.type || state.type;
      const {
        list,
        total,
      } = await api.getGoodList(type, page, state.size, sortType)
      commit('setgoodList', list)
      commit('setType', type)
      if (total > state.goodList.length) {
        return true
      }
      return false

    },
  },

  modules: {}
})