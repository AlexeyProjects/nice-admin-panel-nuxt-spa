export const state = () => ({
  users: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getWires ({ commit }, params) {
    try {
      const res = await this.$axios.post('searchInterfaces', params)
      // commit('setUsers', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async getWiresRules ({ commit }, params) {
    try {
      const res = await this.$axios.post('interfacePairSearch', params)
      // commit('setUsers', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async changeNote ({ commit }, params) {
    try {
      const res = await this.$axios.post('editUserNote', params)
      //commit('setUsers', res.data.data)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  async deletePairs ({ commit }, params) {
    try {
      const res = await this.$axios.post('delInterfaceOrPair', params)
      //commit('setUsers', res.data.data)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
}


export const getter = {}
