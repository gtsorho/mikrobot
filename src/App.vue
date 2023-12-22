<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/navbar.vue'
</script>

<template>
   <RouterView />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;400;500&display=swap');
   p,h1,h2,h3,h4,h5,h6 ,a, button, label  {
      font-family: 'Roboto Slab', serif;
      color: #243050
   }
   p{
   font-weight: 200;
   }
   h1,h2,h3,h4,h5,h6{
   font-weight: 400;
   }
   html {
  scroll-behavior: smooth;
   }
   a{
      text-decoration: none;
   }
</style>