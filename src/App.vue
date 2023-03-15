<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/common/Header.vue'

</script>

<template>
  <Header />
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped></style>
