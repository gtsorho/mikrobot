<template>
  <div v-if="articleContent" class="" style="margin-inline:10%; margin-block:5%">
    <div class=" border border-warning">
      <img :src=" articleContent.image ? `https://mikrobotacademy.com/news_images/${ articleContent.image}` : '../../src/assets/images/article.png' " style="height:3in; width:100%; object-fit:cover" alt="News Image" class="img-fluid">
    </div>
    <h1>{{articleContent.header}}</h1>
    <div>
      <p v-html="parseData"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import edjsParser from "editorjs-parser";

export default {
    props: ['article'],
  data() {
    return {
      articleContent:null
    }
  },
  created(){
    this.getArticle()
  },
  methods:{
    getArticle(){
      axios.get('https://mikrobotacademy.com/api/news/find/'+ this.article
      ).then(response =>{
        this.articleContent = response.data
      }).catch(error =>{
        console.log(error.response)
      })
    }
  }, 
  computed:{
    parseData(){
      const parser = new edjsParser();
        const markup = parser.parse(JSON.parse(this.articleContent.content));
        return markup
    }
  }
}
</script>

<style scoped>  

  .paper{
    /* font-family: 'Courier Prime', monospace  ; */
    font-family: 'Luckiest Guy', cursive;
    /* font-family: 'Noticia Text', serif;
    font-family: 'Roboto Slab', serif; */
  }
  body {
      font-family: 'Times New Roman', serif;
      background-color: #f1eae5;
    }

    .newspaper {
      max-width: 1000px;
      margin: 20px auto;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      line-height: 1.6;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
    }
    .border-warning{
      border-color: #ffe28c !important;
    }
    .bg-warning{
      background-color: #ffe28c !important;
    }
    .text-warning{
      color: #ffe28c !important;
    }
</style>  