<template>
  <NuxtLink :to="{ path: $props.options.url, query: { title: $props.options.title } }" :class="$style.item">
    {{ $props.options.title }}
  </NuxtLink>
</template>

<script>
import { ref } from '@nuxtjs/composition-api';
export default {
  name: 'NavbarItem',
  props: {
    options: {
      type: Object,
      default: () => []
    }
  }
}
</script>

<style module lang="scss">
  .item {
    padding: 1rem 3rem;
    color: #fff;
    text-decoration: none;
    display: flex;
    transition: .2s;
    font-size: 1.6rem;
  }
</style>

<style lang="scss" scoped>
  .nuxt-link-active {
    background: #334058;
  }
</style>