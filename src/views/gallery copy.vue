<template>
  <div class="container p-5" >
    <!-- Header -->
    <div class="header">
      <h1>Image Grid</h1>
      <p>Click on the buttons to change the grid view.</p>
      <button class="btn" @click="setGrid(1)">1</button>
      <button class="btn" @click="setGrid(2)">2</button>
      <button class="btn" @click="setGrid(4)">4</button>
    </div>

    <!-- Photo Grid -->
    <div class="row">
      <div v-for="image in images" :key="image.id" class="column" :style="gridStyle">
        <img :src="image.webContentLink" alt="Image" style="width: 100%" class="p-3 shadow" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      columnImages:[],
      images: [],
      gridColumns: 2,
    };
  },
  mounted(){
    this.getImages()
  },
  // watch: {
  //   images(newImages, oldImages) {
  //     const columns = [];
  //     const imagesPerColumn = Math.ceil(newImages.length / this.gridColumns);

  //     for (let i = 0; i < this.gridColumns; i++) {
  //       columns.push({
  //         id: i,
  //         images: newImages.slice(i * imagesPerColumn, (i + 1) * imagesPerColumn),
  //       });
  //     }

  //     this.columnImages = columns
  //     console.log(columns)
  //   },
  // },
  computed:{
    gridStyle() {
      return {
        msFlex: `${100 / this.gridColumns}%`, // IE10
        flex: `0 0 ${100 / this.gridColumns}%`
      };
    },
  },
  methods: {
    getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    },
    setGrid(columns) {
      this.gridColumns = columns;
    },
    getImages(){
      axios.get('http://localhost:3000/api/students/gallery'
        ).then(response =>{
          this.images = response.data.data.files
          console.log(response.data.data.files)
        }).catch(error =>{
          console.log(error.response)
        })
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  text-align: center;
  padding: 32px;
}

.row {
  display: -ms-flexbox; /* IE 10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE 10 */
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create two equal columns that sits next to each other */
.column {
  -ms-flex: 50%; /* IE 10 */
  flex: 50%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
}

/* Style the buttons */
.btn {
  border: none;
  outline: none;
  padding: 10px 16px;
  background-color: #f1f1f1;
  cursor: pointer;
  font-size: 18px;
}

.btn:hover {
  background-color: #ddd;
}

.btn.active {
  background-color: #666;
  color: white;
}
</style>