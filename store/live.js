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
      const res = await this.$axios.post('addOrEditMusic', params )
      this.$toast.success(`Аудиотрек ${params.title} добавлен`, { position: 'bottom-center', icon: false, duration: 2000 })
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
  async deleteTrack ({ commit }, params) {
    try {
      const res = await this.$axios.get(`deleteMusic/${params.id}`)
      this.$toast.success(`Аудиотрек ${params.title} удален`, { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
}


export const getter = {}
