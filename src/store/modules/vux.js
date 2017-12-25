import { UPDATE_LOADING, UPDATE_PROGRESS, UPDATE_PERCENT } from '../mutation-type'

const vux = {
  state: {
    isLoading: false,
    isProgress: false,
    percent: 0
  },
  mutations: {
    [UPDATE_LOADING](state, payload) {
      state.isLoading = payload.isLoading
    },
    [UPDATE_PROGRESS](state, payload) {
      state.isProgress = payload.isProgress
    },
    [UPDATE_PERCENT](state, payload) {
      state.percent = payload
    }
  }
}

export default vux
