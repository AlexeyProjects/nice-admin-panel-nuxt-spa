export const state = () => ({
  tags: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getTags ({ commit }, params) {
    try {
      const res = await this.$axios.post('simpleSearch', params)
      commit('setUsers', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  }
}


export const getter = {}
