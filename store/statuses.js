export const state = () => ({
  statuses: [],
})

export const mutations = {
  setStatuses (state, data) {
    state.statuses = data
  }
}

export const actions = {
  async getStatuses ({ commit }, params) {
    try {
      const res = await this.$axios.get('getStatuses')
      // commit('setStatuses', res.data.data)
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
}


export const getter = {}
