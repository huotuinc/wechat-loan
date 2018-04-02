import router from './router'
import store from './store'
import { getToken } from './utils/auth'

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', { isLoading: true })
  document.title = to.meta.title || ''

  if (getToken()) {
    if (to.path === '/login') {
      next('/')
      store.commit('UPDATE_LOADING', { isLoading: false })
    } else {
      next()
    }
  } else {
    if (!to.meta.auth) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: false })
})
