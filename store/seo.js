export const state = () => ({
  cards: [],
})

export const mutations = {
  setCards (state, data) {
    state.cards = data
  }
}

export const actions = {
  async getMainSeo ({ commit }, params) {
    try {
      const res = await this.$axios.get('GetMainSeo')
      return res.data.data
    } catch (e) {
      console.log(e.message)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
      return e
    }
  },
  async changeSeo ({ commit }, params) {
    try {
      const res = await this.$axios.post('SetMainSeo', params )
      this.$toast.success(`СЕО информация изменена`, { position: 'bottom-center', icon: false, duration: 2000 })
      return res.data.data
    } catch (e) {
      console.log(e.message)
      this.$toast.error(`Ошибка: ${e.message}`, { position: 'bottom-center', icon: false, duration: 2000 })
      return e
    }
  },

}


export const getter = {}
