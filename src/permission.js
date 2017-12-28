import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/register', '/receive', '/forget', '/download', '/favicon.ico', '/shareOrder']

router.beforeEach((to, from, next) => {
  console.log(getToken())
  store.commit('UPDATE_LOADING', { isLoading: true })
  if (getToken()) {
    next()
    store.commit('UPDATE_LOADING', { isLoading: false })
  } else {
    next('/login')
    store.commit('UPDATE_LOADING', { isLoading: false })
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
