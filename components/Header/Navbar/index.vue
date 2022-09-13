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
import { ref, computed, onMounted, useContext, watch } from '@nuxtjs/composition-api';
export default {
  name: 'navbar',
  setup() {
    const { store } = useContext()
    const navItems = ref([
      {
        title: 'Разделы',
        url: '/sections',
        icon: 'IconsHeaderSections',
        show: true
      },
      {
        title: 'Пользователи',
        url: '/users',
        icon: 'IconsHeaderUsers',
        show: true
      },
      {
        title: 'Теги',
        url: '/tags',
        icon: 'IconsHeaderTags',
        show: true
      },
      {
        title: 'Карточки',
        url: '/cards',
        icon: 'IconsHeaderCards',
        show: true
      },
      {
        title: 'Заказы',
        url: '/orders',
        icon: 'IconsHeaderOrders',
        show: true
      },
      {
        title: 'Эфир',
        url: '/live',
        icon: 'IconsHeaderLive',
        show: true
      },
      {
        title: 'Провода',
        url: '/wires',
        icon: 'IconsHeaderWires',
        show: true
      }
    ])
    const canManageLive = computed(() => {
      return store.state?.login?.ability?.find(ability => ability.id === 11)?.hasUser
    })
    watch(() => canManageLive.value, (first, second) => {
      console.log(
        "Watch props.selected function called with args:",
        first,
        second
      );
    })
    onMounted(() => {
      console.log(canManageLive.value)
      if (!canManageLive.value) {
        navItems.value.find(nav => nav.url === '/live').show = false
      }
      else {
        navItems.value.find(nav => nav.url === '/live').show = true
      }
    })
    return {
      navItems,
      canManageLive
    }
  }
}
</script>

<style>

</style>