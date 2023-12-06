<template>
  <div class="background-container " :class="{ 'animated fadeIn animate__slow': fadeInAnimation }">
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent shadow">
      <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{name:'home', hash:'#home'}">
          <img src="../assets/images/logo1.png" alt="Logo" width="50" class="d-inline-block align-text-top">
          <h4 class="mx-3 my-auto">Mikrobot Academy</h4>
        </router-link>
        <i class="bi bi-list navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"></i>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse " style="width:100%" id="navbarNavAltMarkup">
          <div class="navbar-nav mx-4 d-flex  justify-content-between" style="width: 70%">
            <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
            <router-link class="nav-link" :to="{name:'about'}">About</router-link>
            <router-link class="nav-link" :to="{name:'level'}">Academy</router-link>
            <router-link class="nav-link" :to="{name:'profile'}">Profiles</router-link>
            <router-link class="nav-link" :to="{name:'gallery'}">Gallery</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <div id="slider" class="w-50">
        <transition name="fade" mode="out-in">
          <img :src="currentImage" :key="currentIndex" alt="Slide" class="slider-image animate__animated animate__fadeInLeft animate__slow" />
        </transition>
      </div>
      <!-- <img src="../assets/images/ev31.png" class="w-50 mt-md-4 animate__animated animate__fadeInLeft animate__slow" alt=""> -->
      <div class="text-center animate__animated animate__lightSpeedInLeft animate__slow">
        <h1 class="fw-bold text-secondary mainText" style="font-size:50px"><span style="color: #004e7c;">Code</span> Create <span style="color: #004e7c;">Conquer</span></h1>
        <p style="color: #004e7c;">Unleash the Future with the <span class="text-warning fw-bolder">MIKROBOT</span>  Academy Experience!</p>
      </div>
    </div>
  </div>

</template>

<script>
  import 'animate.css'
  // import 'swiper/swiper-bundle.css';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        fadeInAnimation: false,
      currentIndex: 0,
      slides: [
        { image: new URL(`@/assets/images/bock2.png`, import.meta.url).href   },
        { image: new URL(`@/assets/images/boys.png`, import.meta.url).href  },
        { image: new URL(`@/assets/images/ev31.png`, import.meta.url).href  },
      ],
      }
    },
    mounted() {
    setTimeout(() => {
      this.fadeInAnimation = true;
    }, 500); 
  },
  computed: {
    currentImage() {
      return this.slides[this.currentIndex].image;
    },
  },
  mounted() {
    this.autoPlay();
  },
  methods: {
    showSlide(index) {
      if (index < 0) {
        this.currentIndex = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = index;
      }
    },
    autoPlay() {
      setInterval(() => {
        this.showSlide(this.currentIndex + 1);
      }, 5000); // Change 3000 to adjust the autoplay interval in milliseconds
    },
  }
  }
</script>

<style scoped>
#slider {
  width: 100%;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slider-image {
  width: 100%;
  height: auto;
  z-index: -1
}


nav{
  z-index: 1;
}


.background-container {
  position: relative;
  background: url('../assets/images/SL_073119_22070_041.png') center/cover no-repeat;
  height: 100vh;
  overflow: hidden;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  color: #004e7c;
  z-index: -1;
}

.navbar-light .navbar-toggler-icon {
  background-color: #ffffff;
}

  .nav-link{
    color:  #004e7c;;
    border: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s ease-out;
    padding-block: 2px;
    text-align: end !important;

  }
  .nav-link:hover{
    color:  #004e7c;;
    padding-inline: 20px;
    border: 2px solid  #004e7c;
    border-radius: 50px;
    background-color: #fff;
  }

@media (max-width: 767px) {
  .navbar-nav {
    flex-direction: column;
  }
  .navbar-nav .nav-link {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .navbar-nav {
    flex-direction: column;
  }
  .navbar-nav .nav-link {
    text-align: center;
  }

  .navbar-brand h4{
    font-size: 17px;
  }

  /* .navbar-brand img{
    width: 10%;
  } */
  @media (max-width: 767px) {
    .collapse{
      background-color: #fff;
    }
  }
  .content {
    flex-direction: column-reverse;
    align-items: center;
    top: -30%;
  }


  .content img {
    max-width: 100%;
    width: 100% !important;
  }
  .mainText{
      font-size: 35px !important;
  }
}
</style>
