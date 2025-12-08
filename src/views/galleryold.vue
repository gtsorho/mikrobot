<template>
  <div :id="galleryID">
    <a
      v-for="(image, key) in imagesData"
      :key="key"
      :href="image.webContentLink"
      target="_blank"
      rel="noreferrer"
    >
      <img :src="image.webContentLink" alt="" />
    </a>
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import axios from 'axios';

export default {
  name: 'SimpleGallery',
  setup() {
    return {
      galleryID:'mikrobot',
      imagesData: [],
    };
  },
  mounted() {
    this.getImages()
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    getImages(){
      axios.get('https://mikrobotacademy.com/api/students/gallery'
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
