const vux = {
  state: {
    isLoading: false
  },
  mutations: {
    UPDATE_LOADING(state, status) {
      state.isLoading = status
    }
  }
}

export default vux
