import Vue from 'vue'
import Vuex from 'vuex'
import vux from './modules/vux'
import user from './modules/user'
import loan from './modules/loan'
import order from './modules/order'
import esign from './modules/esign'
import credit from './modules/credit'
import record from './modules/record'
import cases from './modules/cases'
import feedback from './modules/feedback'
import authentication from './modules/authentication'
import getters from './getters'
import fake from './modules/fake'
import fakeupdate from './modules/fakeupdate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    loan,
    order,
    authentication,
    esign,
    credit,
    vux,
    record,
    cases,
    feedback,
    fake,
    fakeupdate
  },
  getters
})
