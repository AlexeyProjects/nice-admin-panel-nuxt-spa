export const state = () => ({
  cards: [],
})

export const mutations = {
  setCards (state, data) {
    state.cards = data
  }
}

export const actions = {
  async addAuthor ({ commit }, params) {
    try {
      const res = await this.$axios.post('addOrEditAuthor', params)
      // commit('setCards', res.data.data)
      this.$toast.success(`Автор ${params.name} успешно создан`, { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
      console.log(e)
    }
  }
}


export const getter = {}
