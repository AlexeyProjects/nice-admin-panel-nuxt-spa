export const state = () => ({
  tags: [],
})

export const mutations = {
  setUsers (state, data) {
    state.sections = data
  }
}

export const actions = {
  async getTags ({ commit }, params) {
    try {
      const res = await this.$axios.post('simpleSearch', params)
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async addTag ({ commit }, params) {
    try {
      const res = await this.$axios.post('addNewTag', params)
      this.$router.push({
        path: `/tags/${res.data.data.id}`
      })
      return res.data.data
    } catch (e) {
      console.log(e)
    }
  },
  async deleteTag ({ commit }, params) {
    try {
      const res = await this.$axios.get(`deleteTag/${params}`)
      this.$toast.success('Тег успешно удален', { position: 'bottom-center', icon: false, duration: 2000 })
      this.$router.push({
        path: '/tags'
      })
      return res.data.data
    } catch (e) {
      console.log(e)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
    }
  }
}


export const getter = {}
