export const state = () => ({
  users: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getUsers ({ commit }, params) {
    try {
      const res = await this.$axios.post('usersSearch', params)
      commit('setUsers', res.data.data)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async changeNote ({ commit }, params) {
    try {
      const res = await this.$axios.post('editUserNote', params)
      //commit('setUsers', res.data.data)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  async getAbilities ({ commit }, params) {
    try {
      const res = await this.$axios.get(`getAbilities/${params}`)
      //commit('setUsers', res.data.data)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
  async addAbility ({ commit }, params) {
    try {
      const res = await this.$axios.post(`addAbility`, params)
      //commit('setUsers', res.data.data)
      this.$toast.success('Права изменены', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data
    } catch (e) {
      console.log(e)
      this.$toast.success('Ошибка:' +e.message, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async deleteAbility ({ commit }, params) {
    try {
      const res = await this.$axios.post(`deleteAbility`, params)
      //commit('setUsers', res.data.data)
      this.$toast.success('Права изменены', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data
    } catch (e) {
      console.log(e)
      this.$toast.success('Ошибка:' +e.message, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
}


export const getter = {}
