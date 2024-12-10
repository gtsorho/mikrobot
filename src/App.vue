<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/navbar.vue'
</script>

<template>
   <RouterView />
</template>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;400;500&display=swap'); */
  @import url('https://fonts.googleapis.com/css2?family=Noticia+Text:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
   p,h1,h2,h3,h4,h5,h6 ,a, button, label,span,input,textarea,select  {
      font-family: "Poppins", sans-serif;
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