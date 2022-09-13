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
      // commit('setSections', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },

  async getSection ({ commit }, params) {
    try {
      const res = await this.$axios.get(`getSectionById/${params}`)
      // commit('setSections', res.data.data)
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
  },

  async saveQuote ({ commit }, params) {
    try {
      const data = await this.$axios.post('addOrEditQuote', params)
      this.$toast.success('Цитата сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      //commit('setSections', res.data.data)
      return data
    } catch (e) {
      this.$toast.error('Ошибка:' +e.message, { position: 'bottom-center', icon: false, duration: 2000 })
      console.log(e)
    }
  },

  async deleteQuote ({ commit }, params) {
    try {
      const data = await this.$axios.get(`deleteQuote/${params}`)
      this.$toast.success('Цитата сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      //commit('setSections', res.data.data)
      return data
    } catch (e) {
      this.$toast.error('Ошибка:' +e.message, { position: 'bottom-center', icon: false, duration: 2000 })
      console.log(e)
    }
  }
}


export const getter = {}
