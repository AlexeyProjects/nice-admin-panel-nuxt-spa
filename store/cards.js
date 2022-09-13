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
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
      console.log(e)
    }
  },
  async getCard ({ commit }, params) {
    try {
      const res = await this.$axios.get(`card/${params}`)
      return res.data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
      console.log(e)
    }
  },
  async saveCard ({ commit }, params) {
    try {
      const res = await this.$axios.post(`addOrEditCard`, params)
      this.$toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e.message)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async deleteCard ({ commit }, params) {
    try {
      const res = await this.$axios.get(`deleteById/${params}`)
      this.$toast.success('Карточка успешно удалена', { position: 'bottom-center', icon: false, duration: 2000 })
      this.$router.push({
        path: '/cards'
      })
      return res.data.data
    } catch (e) {
      console.log(e.message)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
}


export const getter = {}
