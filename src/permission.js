import router from './router'
import store from './store'

// const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', { isLoading: true })
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', { isLoading: true })
})
