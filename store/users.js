export const state = () => ({
  users: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getUsers ({ commit }, params) {
    try {
      const res = await this.$axios.post('usersSearch', params)
      commit('setUsers', res.data.data)
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
}


export const getter = {}
