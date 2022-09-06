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
        url: '/sections',
        icon: 'IconsHeaderSections'
      },
      {
        title: 'Пользователи',
        url: '/users',
        icon: 'IconsHeaderUsers'
      },
      {
        title: 'Теги',
        url: '/tags',
        icon: 'IconsHeaderTags'
      },
      {
        title: 'Карточки',
        url: '/cards',
        icon: 'IconsHeaderCards'
      },
      {
        title: 'Заказы',
        url: '/orders',
        icon: 'IconsHeaderOrders'
      },
      {
        title: 'Эфир',
        url: '/live',
        icon: 'IconsHeaderLive'
      },
      {
        title: 'Провода',
        url: '/wires',
        icon: 'IconsHeaderWires'
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