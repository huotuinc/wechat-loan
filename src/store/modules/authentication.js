import { AUTH_INFO } from '../mutation-type'

const authentication = {
  state: {
    authInfo: {}
  },
  mutations: {
    [AUTH_INFO](state, payload) {
      state.authInfo = payload
    }
  },
  actions: {}
}

export default authentication
