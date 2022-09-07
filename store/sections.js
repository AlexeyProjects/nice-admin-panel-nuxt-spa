export const state = () => ({
  sections: [],
})

export const mutations = {
  setSections (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getSections ({ commit }, params) {
    try {
      const res = await this.$axios.post('sectionsSearch', params)
      commit('setSections', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },

  async editSection ({ commit }, params) {
    try {
      const data = await this.$axios.post('editSection', params)
      //commit('setSections', res.data.data)
      return data
    } catch (e) {
      console.log(e)
    }
  }
}


export const getter = {}
