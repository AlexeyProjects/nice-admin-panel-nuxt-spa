<template>
  <div class="">
    <HeaderNavbarItem
    v-for="(item, index) in navItems"
    :key="index"
    :options="item"
    />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api';
export default {
  name: 'navbar',
  setup() {
    const navItems = ref([
      {
        title: 'Разделы',
        url: '/sections'
      },
      {
        title: 'Пользователи',
        url: '/users'
      },
      {
        title: 'Теги',
        url: '/tags'
      }
    ])
    return {
      navItems
    }
  }
}
</script>

<style>

</style>