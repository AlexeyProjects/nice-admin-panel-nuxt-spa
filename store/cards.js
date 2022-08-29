export const state = () => ({
  cards: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getCards ({ commit }, params) {
    try {
      const res = await this.$axios.post('cardsSearch', params)
      //commit('setUsers', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  }
}


export const getter = {}
