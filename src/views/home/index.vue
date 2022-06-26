<template>
  <div class='home-page'>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('模板')
</script>

<style lang="scss" scope>
.home-page {
  .name{
    color: $bg-color;
  }
}
</style>
