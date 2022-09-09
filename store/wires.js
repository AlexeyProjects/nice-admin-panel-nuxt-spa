export const state = () => ({
  users: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getWires ({ commit }, params) {
    try {
      const res = await this.$axios.post('searchInterfaces', params)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async getWiresRules ({ commit }, params) {
    try {
      const res = await this.$axios.post('interfacePairSearch', params)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async changeNote ({ commit }, params) {
    try {
      const res = await this.$axios.post('editUserNote', params)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  async addPair ({ commit }, params) {
    try {
      const res = await this.$axios.post('addPair', params)
      this.$toast.success('Пара успешна добавлена', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data
    } catch (e) {
      this.$toast.console.error();('Ошибка', { position: 'bottom-center', icon: false, duration: 2000 })
      return e
    }
  },
  async deletePairs ({ commit }, params) {
    try {
      const res = await this.$axios.post('delInterfaceOrPair', params)
      this.$toast.success('Пара успешна удалена', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data
    } catch (e) {
      this.$toast.error('Ошибка:' + e.message, { position: 'bottom-center', icon: false, duration: 2000 })
      return e
    }
  },
}


export const getter = {}
