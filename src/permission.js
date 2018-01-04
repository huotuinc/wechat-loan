import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/register', '/receive', '/forget', '/download', '/shareOrder', '/case']

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
      store.commit('UPDATE_LOADING', { isLoading: false })
    } else {
      next()
      store.commit('UPDATE_LOADING', { isLoading: false })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      store.commit('UPDATE_LOADING', { isLoading: false })
    } else {
      next('/login')
      store.commit('UPDATE_LOADING', { isLoading: false })
    }
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
