export const state = () => ({
  authorizated: false,
  token: '',
  user: []
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
    }
  },
  setUser (state,data) {
    state.user = data
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
  },
  async checkVerify ({ commit }, params) {
    try {
      const res = await this.$axios.get('verifyToken')
      if (res.status === 200) {
        commit('setUser',res.data.data[0])
      }
      return res
    } catch (e) {
      console.log('e')
      this.$router.push({
        path: '/login'
      })
      // this.$toast.error('Данные не корректны', { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async logout ({ commit }, params) {
    try {
      const res = await this.$axios.get('logout/current')
      localStorage.removeItem('token')
      this.$toast.success('Вы успешно вышли из профиля', { position: 'bottom-center', icon: false, duration: 2000 })
      return res
    } catch (e) {
      this.$toast.error('Данные не корректны', { position: 'bottom-center', icon: false, duration: 2000 })
    }
  }
}


export const getter = {}
