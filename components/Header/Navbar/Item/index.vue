<template>
  <NuxtLink :to="{ path: $props.options.url, query: { title: $props.options.title } }" :class="$style.item">
    
    <span>{{ $props.options.title }}</span>
    <components :is="$props.options.icon"/>
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
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 1.2rem 0rem 1.2rem 2rem;
    color: #fff;
    text-decoration: none;
    display: flex;
    transition: .2s;
    font-size: 1.6rem;
    color: rgb(156, 168, 179);
    span {
      text-align: left;
    }
    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
    @media (max-width: 768px) {
      flex-direction: row;
      svg {
        margin-left: 2rem;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .nuxt-link-active {
    background: #334058;
    color: #fff;
  }
</style>