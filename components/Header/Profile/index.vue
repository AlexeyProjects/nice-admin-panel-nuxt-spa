<template>
  <div :class="$style.profile">
    <div class="">
      <p class="mb-15">{{ getUserInfo.email }}</p>
      <button @click.prevent="logout" class="btn">Выход</button>
    </div>
  </div>
</template>

<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss">
</style>