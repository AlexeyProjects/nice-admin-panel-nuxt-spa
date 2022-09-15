export const state = () => ({
  tags: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getGroups ({ commit }, params) {
    try {
      const res = await this.$axios.post('simpleSearch', params)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async addGroup ({ commit }, params) {
    try {
      const res = await this.$axios.post('addNewGroup', params)
      this.$router.push({
        path: `/users/groups/${res.data.data.id}`
      })
      this.$toast.success('Группа сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async changeGroup ({ commit }, params) {
    try {
      const res = await this.$axios.post('changeUserGroup', params)
      this.$toast.success('Пользователю успешно изменена группа', { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  },
  async deleteGroup ({ commit }, params) {
    try {
      const res = await this.$axios.get(`deleteGroupById/${params}`)
      this.$toast.success('Группа успешно удален', { position: 'bottom-center', icon: false, duration: 2000 })
      this.$router.push({
        path: `/users/groups`
      })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  }
}


export const getter = {}
