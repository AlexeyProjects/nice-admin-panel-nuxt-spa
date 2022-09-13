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

  async changeStatus ({ commit }, params) {
    // console.log(this.$axios.defaults.baseHome)
    try {
      const res = await this.$axios.post(`https://test.itisthenice.com/radioCommands`, params, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      // this.$toast.success(`Радио ${params.title} удален`, { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },

  async getStatus ({ commit }, params) {
    // console.log(this.$axios.defaults.baseHome)
    try {
      const res = await this.$axios.post(`https://test.itisthenice.com/radioCommands`, params, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      // this.$toast.success(`Радио ${params.title} удален`, { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.result
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
}


export const getter = {}
