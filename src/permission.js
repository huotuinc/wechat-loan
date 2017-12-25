import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/register', '/receive', '/forget', '/download']

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', { isLoading: true })
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      store.commit('UPDATE_LOADING', { isLoading: false })
    }
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
