import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from '../views/main.vue'
import About from '../views/AboutView.vue'
import Level from '../views/levelView.vue'
import Profile from '../views/profile.vue'
import ProfileInfo from '../views/profileInfo.vue'
import Profile_admin from '../views/profileAdmin.vue'
import Gallery from '../views/gallery.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path:'about',
          name:'about',
          component:About
        },
        {
          path:'level',
          name:'level',
          component:Level
        },
        {
          path:'profile',
          name:'profile',
          component:Profile
        },
        {
          path:'admin',
          name:'admin',
          component:Profile_admin
        },
        {
          path:'gallery',
          name:'gallery',
          component:Gallery
        },
        {
          path:'profileInfo/:student',
          name:'profileInfo',
          component:ProfileInfo,
          props: true
        }
      ]
    },
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        return {
        el: to.hash,
        top: 50,
        behavior: 'smooth',
        }
    }else{
        return {top: 0}
    }
  }
})

export default router
