<template>
  <div class="m-p-g">
    <div class="m-p-g__thumbs" data-google-image-layout data-max-height="350">
      <img v-for="(image, index) in images" :key="index" :src="image.thumb" :data-full="image.full" class="m-p-g__thumbs-img" />
    </div>

    <div class="m-p-g__fullscreen"></div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  mounted() {
    this.initializeMaterialPhotoGallery();
  },
  methods: {
    initializeMaterialPhotoGallery() {
      const elem = this.$el;
      document.addEventListener('DOMContentLoaded', () => {
        new MaterialPhotoGallery(elem);
      });
    },
  },
};
</script>

<style scoped>
/* Copy your existing styles here */
</style>
