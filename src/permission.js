import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/register', '/receive', '/forget', '/download', '/shareOrder']

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', { isLoading: true })
  document.title = to.meta.title
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
