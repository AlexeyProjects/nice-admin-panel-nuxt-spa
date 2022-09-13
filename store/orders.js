export const state = () => ({
  orders: [],
})

export const mutations = {
  setCards (state, data) {
    state.cards = data
  }
}

export const actions = {
  async getOrders ({ commit }, params) {
    try {
      const res = await this.$axios.post('ordersSearch', params)
      // commit('setCards', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async getOrder ({ commit }, params) {
    try {
      const res = await this.$axios.get(`getFullOrder/${params}`)
      // commit('setCards', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async changeStatus ({ commit }, params) {
    try {
      const res = await this.$axios.post(`changeOrderStatus`, params)
      // commit('setCards', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  }
}


export const getter = {}
