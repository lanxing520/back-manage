<script setup lang="ts">
import { RouterView } from 'vue-router'
// import index form './index.vue'
import MainPage from '@/views/main-page/index.vue'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <MainPage /> -->
  <RouterView />
</template>

<style scoped></style>
