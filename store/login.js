export const state = () => ({
  authorizated: false,
  token: '',
  user: [],
  ability: [],
  author: []
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
  setMyAbility (state, data) {
    state.ability = data
  },
  setAuthor (state, data) {
    state.author = data
  }
}

export const actions = {
  async login ({ commit }, params) {
    try {
      const res = await this.$axios.post('login', params)
      if (res.data.data.abilities.length > 6) {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.data.access_token)
          this.$toast.success('Вы успешно авторизовались', { position: 'bottom-center', icon: false, duration: 2000 })
          this.$router.push('/')
          commit('setToken')
        }
      } else { 
        this.$toast.error('Недостаточно прав', { position: 'bottom-center', icon: false, duration: 2000 })
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
        console.log(res.data.data)
        commit('setUser',res.data.data.user)
        commit('setAuthor',res.data.data?.author)
        // commit('abilities', res.data.data)
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
  },
  async getMyAbility ({ commit }, params) {
    try {
      const res = await this.$axios.get(`getAbilities/${params}`)
      commit('setMyAbility', res.data.data)
      return res.data
    } catch (e) {
      console.log(e)
    }
  },
}


export const getter = {}
