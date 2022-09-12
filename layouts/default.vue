<template>
  <div  class="wrap">
    <div v-if="!loading" class="">
      <Header/>
      <div class="main">
        <Nuxt class="app"/>
      </div>
    </div>
    <UILoading
    v-else
    />
    
    
  </div>
</template>

<script>
import { ref, onMounted, useContext, useRouter } from '@nuxtjs/composition-api';
export default {

  setup() {
    const { store } = useContext();
    const route = useRouter()
    const loading = ref(true)
    onMounted(async() => {
      loading.value = true
      await store.commit('login/setToken')
      await store.dispatch('login/checkVerify')
      const user_id = store.state.login.user.id
      // const user_id
      await store.dispatch(`login/getMyAbility`, user_id)
      loading.value = false
    })
    return {
      loading
    }
  },
}
</script>
