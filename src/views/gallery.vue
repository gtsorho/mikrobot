  <template>
    <div class="row">
      <div class="column" v-for="(imageGroup, index) in groupedImages" :key="index">
        <img v-for="(image, imgIndex) in imageGroup" :src="image.thumbnailLink" :key="imgIndex" />
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        images: [],
        imagesPerColumn: 5, 
        zoom:275
      };
    },
    created(){
      this.getImages()
    },
    methods: {
    async getImages(){
        await axios.get('https://mikrobotacademy.com/api/students/gallery'
          ).then(response =>{
            this.images = response.data.data.files
            console.log('Total images:', this.images.length);
          }).catch(error =>{
            console.log(error.response)
          })
      },
    },
    computed: {
      groupedImages() {
        const groups = [];
        for (let i = 0; i < this.images.length; i += this.imagesPerColumn) {
          groups.push(this.images.slice(i, i + this.imagesPerColumn));
        }
        return groups;
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

.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  max-height:4in;
  object-fit:cover;
  object-position: 50% 0%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
