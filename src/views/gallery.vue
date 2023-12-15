<template>
  <div class="main py-5">
    <div class="text-center my-4">
      <label for="customRange1" class="form-label d-block"><span class="bg-light py-1 px-3 rounded-3 text-muted" >zoom - {{zoom}}%</span></label>
      <input type="range" v-model="zoom" class="form-range w-25  mx-auto d-block"  min="100" max="600"  id="customRange1">
    </div>
    <div class="container">
        <img v-for="(image, i) in images" :key="i" :style="'width:'+ zoom +'px'" :src="image.webContentLink" alt="gallary">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      images: [
      ],
      zoom:275
    };
  },
  mounted(){
    this.getImages()
  },
  methods: {
    getImages(){
      axios.get('https://mikrobots.miphost.com/api/students/gallery'
        ).then(response =>{
          this.images = response.data.data.files
          console.log(response.data.data.files)
        }).catch(error =>{
          console.log(error.response)
        })
    },
  },
};
</script>

<style scoped>
  @import url(https://fonts.bunny.net/css?family=amita:700);

.main {
    background: url(https://images.unsplash.com/photo-1562852561-ce295949e3f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
        center center/cover no-repeat;
    min-height: 100vh;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
}

p{
  font-weight: 200 !important;
}

h1,h2,h3,h4,h5,h6, label{
  font-weight: 400 !important;
}

img {
    /* width: 200px; */
    height: 300px;
    margin: 10px;
    object-fit: cover;
    border: 10px solid #fefae033;
    /* -webkit-filter: grayscale(0%); */
    /* filter: grayscale(100%); */
    border-radius: 5px;
    transition-duration: 1s;
}

  .form-range::-webkit-slider-thumb:active {
      background-color: red;
  }
  .form-range::-webkit-slider-thumb,
  .custom-range:focus::-webkit-slider-thumb, 
  .custom-range:focus::-moz-range-thumb,
  .custom-range:focus::-ms-thumb {
      box-shadow: red;
  }

img:hover {
    border: 5px solid #ffffff5b;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    -webkit-filter: none;
    filter: none;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

  </style>
