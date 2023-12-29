<template>
<transition v-bind:css="false" name="banner">
<div class="slider" id="home">
  <div  :style="{ 'background-image': 'linear-gradient(45deg, rgba(29, 81, 111, 0.65), #ccab258a), url(' + currentImage + ')'}" ref="bgImage" class="brand-slide jumbo ">
      <nav class="navbar navbar-expand-lg bg-transparent">
        <div class="container-fluid">
        <router-link class="navbar-brand  d-flex" :to="{name:'home', hash:'#home'}">
          <img src="../assets/images/logo1.png" alt="Logo" width="50" class=" d-inline-block align-text-top">
          <h4 class="mx-3 my-auto text-light">Mikrobot Academy</h4>
        </router-link>
        <i class="bi bi-list navbar-toggler border-0 p-0 text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"></i>
          <div class="collapse navbar-collapse " style="width:100%" id="navbarNavAltMarkup">
           <div class="w-100 d-flex justify-content-end">
               <div class="navbar-nav mx-4 d-flex  justify-content-between" style="width: 70%">
              <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
              <router-link class="nav-link" :to="{name:'about'}">About</router-link>
              <router-link class="nav-link" :to="{name:'level'}">Academy</router-link>
              <router-link class="nav-link" :to="{name:'profile'}">Profiles</router-link>
              <router-link class="nav-link" :to="{name:'gallery'}">Gallery</router-link>
              <router-link class="nav-link" :to="{name:'news'}">News</router-link>
            </div>
           </div>
          </div>
        </div>
      </nav>


  <div class="brand py-4">
    <div class="container" style="margin-block:9%">
       <h1 class="d-block shadow-lg rounded-3 px-2 py-1 text-start text-light animate__animated animate__fadeInUp animate__slow" :key="currentImageIndex" style="width:fit-content; background-color:#004e7cab" ref="brandText">
         <span class="text-warning fw-normal">Empowering Tomorrow's</span> <span class="text-light fw-light"> Innovators Today</span> 
      </h1>
      <h4 class="d-block shadow-lg rounded-3 px-2 py-1 text-start text-light animate__animated animate__fadeInUp animate__slow" :key="currentImageIndex" style="width:fit-content;  background-color:#ffffffc3" ref="brandText">
         <span class="text-muted fw-light ">Your Journey Starts with Robotics at the</span> <span class=" fw-bold" style="color:#004e7c">  MIKROBOT Academy</span> 
      </h4>
      <div>
      <!-- <router-link  ref="brandBtn" :key="currentImageIndex" class="brand-btn btn btn-transparent border-3 rounded-0 animate__animated animate__fadeInUp  py-2 border-light text-light " :to="{name:'home', hash:'#services'}">Our Services</router-link> -->
      </div>
    </div>
  </div>
 </div>
 
</div>
</transition>
 
</template>
  <script>
  export default {
    data() {
      return {
        text: 'Your Text Here',
        highlightedIndex: null,
        brandText: ' Power & Energy Industry',
        subText: 'Delivering to you not only ideas that work but work that stand out. ',
        maxRotation: 5,
        maxTranslation: 10,
        images: [
        'nanaYaa.jpg',
        'ing5.jpg',
        'img4.jpg',
        'ing1.jpg'
      ],
      currentImageIndex: 0
      }
    },
   computed: {
      currentImage() {
        return new URL(`../assets/images/${this.images[this.currentImageIndex]}`,  import.meta.url).href;
      },
    },
    mounted() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);
    },
    methods: {
     
    },
  }
  </script>


<style scoped>

.brand {
  width:100%;
  height: 400px;
}

.brand-text  {
  color: #ffffff;
  text-align: left !important;
}

.address{
  color:white;
}

.brand-btn {
  font-size: calc(8px + (16 - 8) * ((100vw - 320px) / (1024 - 320)));
  color:#fff;
  text-align: center;
}

  .jumbo{
    width:100%;
    height: 6in;
    background-size: cover;
  }
  .nav-link{
    color:  #ffffff;;
    border: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s ease-out;
    padding-block: 2px;
    text-align: end !important;

  }
  .nav-link:hover{
    color:  #ffffff;;
    padding-inline: 20px;
    border: 2px solid  #ffffff;
    border-radius: 50px;
    background-color: #ffffff00;
  }



.banner-enter {
  opacity: 0;
  transition: opacity 1s;
}

.banner-leave {
  opacity: 1;
  transition: opacity 1s;
}

.banner-enter-active,
.banner-leave-active {
  opacity: 1;
}
.banner-enter-to,
.banner-leave-from {
  opacity: 0;
}
</style>

