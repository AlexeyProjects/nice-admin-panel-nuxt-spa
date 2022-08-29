<template>
  <div class="">
    <Header/>
    <Nuxt class="app"/>
  </div>
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api';
export default {

  setup() {
    const { store } = useContext();
    onMounted(() => {
      store.commit('login/setToken')
    })
  },
}
</script>
