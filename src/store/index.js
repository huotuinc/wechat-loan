import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import loan from './modules/loan'
import order from './modules/order'
import esign from './modules/esign'
import vux from './modules/vux'
import authentication from './modules/authentication'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    loan,
    order,
    authentication,
    esign,
    vux
  },
  getters
})
