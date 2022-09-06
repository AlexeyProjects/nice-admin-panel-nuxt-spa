export const state = () => ({
  cards: [],
})

export const mutations = {
  setCards (state, data) {
    state.cards = data
  }
}

export const actions = {
  async loadTrack ({ commit }, params) {
    try {
      const res = await this.$axios.post('upload-file', params, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      this.$toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e.message)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async getMusic ({ commit }, params) {
    try {
      const res = await this.$axios.post(`getMusic`)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async saveCard ({ commit }, params) {
    try {
      const res = await this.$axios.post(`addOrEditCard`, params)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
}


export const getter = {}
