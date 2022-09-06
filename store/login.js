export const state = () => ({
  authorizated: false,
  token: ''
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  },
  setToken (state) {
    const token = localStorage.getItem('token')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      state.authorizated = true
      state.token = token
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(this.$axios.defaults.headers.common['Authorization'])
    }
  },
}

export const actions = {
  async login ({ commit }, params) {
    try {
      const res = await this.$axios.post('login', params)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.data.access_token)
        this.$toast.success('Вы успешно авторизовались', { position: 'bottom-center', icon: false, duration: 2000 })
        this.$router.push('/')
        commit('setToken')
      }
      return res
    } catch (e) {
      this.$toast.error('Данные не корректны', { position: 'bottom-center', icon: false, duration: 2000 })
    }
  }
}


export const getter = {}
