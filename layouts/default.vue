<template>
  <div class="">
    <Header/>
    <div class="main">
      <!-- <Search></Search> -->
      <Nuxt class="app"/>
    </div>
    
  </div>
</template>

<script>
import { onMounted, useContext, useRouter } from '@nuxtjs/composition-api';
export default {

  setup() {
    const { store } = useContext();
    const route = useRouter()
    onMounted(async() => {
      await store.commit('login/setToken')
      await store.dispatch('login/checkVerify')
    })
  },
}
</script>
