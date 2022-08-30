export const state = () => ({
  cards: [],
})

export const mutations = {
  setCards (state, data) {
    state.cards = data
  }
}

export const actions = {
  async getCards ({ commit }, params) {
    try {
      const res = await this.$axios.post('cardsSearch', params)
      commit('setCards', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async getCard ({ commit }, params) {
    try {
      const res = await this.$axios.get(`card/${params}`)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  }
}


export const getter = {}
