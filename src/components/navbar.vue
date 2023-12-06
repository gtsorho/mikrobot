<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-lg  "  :class="{ 'navbar-hidden': !showNavbar }" >
      <div class="container-fluid">
        <router-link class="navbar-brand mx-5 d-flex" :to="{name:'home', hash:'#home'}">
          <img src="../assets/images/logo1.png" alt="Logo" width="50" class=" d-inline-block align-text-top">
          <h4 class="mx-3 my-auto">Mikrobot Academy</h4>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" style="width:100%" id="navbarNavAltMarkup">
          <div class="navbar-nav mx-4 d-flex justify-content-between" style="width: 70%">
            <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
            <router-link class="nav-link" :to="{name:'about'}">About</router-link>
            <!-- <router-link class="nav-link" :to="{name:'level'}">Academy</router-link> -->
            <div class="dropdown-center" @mouseover="showDropdown" @mouseleave="hideDropdown">
              <a class=" nav-link" data-bs-toggle="dropdown" id="dropdownMenuButton"  aria-haspopup="true" aria-expanded="false">
                Academy 
              </a>
              <ul class="dropdown-menu dropdown-menu" :class="{ show: isDropdownVisible }" aria-labelledby="dropdownMenuButton" >
                <li><router-link class="drops dropdown-item " :to="{name:'level', hash:'#elementary'}">Elementary</router-link></li>
                <li><router-link class="drops dropdown-item " :to="{name:'level', hash:'#junior'}">Junior</router-link></li>
                <li><router-link class="drops dropdown-item " :to="{name:'level', hash:'#senior'}">Senior</router-link></li>
              </ul>
            </div>
            <router-link class="nav-link" :to="{name:'profile'}">Profiles</router-link>
            <router-link class="nav-link" :to="{name:'gallery'}">Gallery</router-link>
            
          </div>
        </div>
      </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
      isDropdownVisible: false,
      showNavbar: false,
      navbarHeight: 0,
      navbarThreshold: 0,
    };
  },
  mounted() {
    this.navbarHeight = 300;
    this.navbarThreshold = this.navbarHeight - 100; 
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      console.log('hello')
      this.showNavbar = window.scrollY > this.navbarThreshold;
    }
  },
  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
  },
};
</script>
<style scoped>
  
.navbar-light .navbar-toggler-icon {
  background-color: #ffffff;
}
.drops{
  font-weight: 200;
  font-size: 13px;
}

.dropdown-menu {
  transition: opacity 0.3s;
  opacity: 0;
  display: block;
  pointer-events: none;
}

.show {
  opacity: 1;
  pointer-events: auto;
}

  .nav-link{
    color:  #004e7c;;
    border: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s ease-out;
    padding-block: 2px;

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
}
</style>