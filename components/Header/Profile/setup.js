import { ref, reactive, onMounted, useContext, useRouter, computed, set } from '@nuxtjs/composition-api';
export default {
  name: 'HeaderProfile',
  setup(_, ctx) {
    const { store } = useContext()
    const route = useRouter()
    const getUserInfo = computed(() => {
      return store.state.login.user
    })
    const logout = async () => {
      await store.dispatch('login/logout')
      route.push({
        path: '/login'
      })
    }
    onMounted(() => {
      getUserInfo
    })
    return {
      getUserInfo,
      logout
    }
  }
}