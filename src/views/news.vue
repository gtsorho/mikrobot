<template>
  
  <div class="container my-5">
    <!-- <div class=" d-flex justify-content-around ">
      <input type="text" class="form-control form-control-sm rounded-pill my-3 w-50" v-model="searchQuery" @keyup="search" placeholder="Search by title" />
      <p class="my-3" style="font-size:13px">{{students.length}} Item(s) Found</p>
    </div> -->

  <section class="m-5" id="news">
    <h2>News | Updates</h2>
    <vueper-slides
      class="no-shadow"
      bullets-outside 
      autoplay
      :duration="5000"
      >
        <vueper-slide 
        class="text-light"
        v-for="(slide, i) in announcements"
        :key="i"
        :content="!slide.image ? slide.content : null"
        :title="!slide.image ? slide.header : null"
        style="background-color: #004e7c"
        :image="slide.image ? `https://mikrobotacademy.com/news_images/${slide.image}` : null">
        </vueper-slide>
    </vueper-slides>

    <div class="row row-cols-1 g-1 row-cols-lg-4 my-5 d-flex justify-content-center"  v-if="allNews.length > 0">
      <div class="row mx-2 g-0 bg-body-light position-relative shadow rounded-1 col"  @click="handleNews(news.url)" style="width:3in; height:1in; overflow:hidden"  v-for="(news , i) in allNews" :key="i" >
        <div class="col-md-6 mb-md-0 p-md-2" style=" height:inherit !important;">
          <img :src="news.image ? news.image : 'src/assets/images/no-photos.png'"  style=" height:inherit !important;" class="w-100 object-fit-cover rounded-1">
        </div>
        <div class="col-md-6 p-2 ps-md-0"  style=" height:inherit !important;">
          <h6 style="font-size:15px" class="mt-0  text-truncate">{{news.header}}</h6>
          <p style="font-size:12px" class="p-0 m-0" v-if="news.content" >  {{truncateData(news.content, 30)}}</p>
          <a :href="news.url" v-if="news.src"  style="font-size:12px" >{{truncateData(news.src, 30)}}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="m-5" v-if="articles.length > 0">
    <h2>Articles</h2>
    <div class="row row-cols-md-2 my-2 justify-content-center row-cols-lg-3" >
      <div  class="col-lg-4 my-2" v-for="(article, index) in articles" :key="index" @click="handleArticle(article.id)">
        <div class="card shadow" style="width: 18rem; height:4in">
          <img :src="article.image ? `https://mikrobotacademy.com/news_images/${article.image}` : noImage" style="height:2.5in; object-fit:cover" class="card-img-top" > 
          <div class="card-body"> 
            <h5 class="card-title">{{article.header}}</h5>
            <p class="card-text" style="font-size:12px" v-if="article.content" v-html="truncateData(parseData(article.content), 150)"></p>
          </div>
        </div>
      </div>
    </div>
  </section>



<br><br>
<br><br>
</div>
</template>
<script>

import axios, { all } from 'axios'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import edjsParser from "editorjs-parser";

export default {
      components:{
        VueperSlides,
        VueperSlide
      },
    data() {
        return {
         noImage: new URL(`../assets/images/article.png`,  import.meta.url).href,
         students:{},
         searchQuery:'',
         articles:[],
         allNews:[],
        announcements: [],
        }
    },  
    mounted(){
      this.getNews()
    },
    methods:{
      getNews(){
        axios.get('https://mikrobotacademy.com/api/news/')
        .then(res =>{
          const groupedData = res.data.reduce((acc, currentItem) => {
          const { tag, ...rest } = currentItem;
          if (!acc[tag]) {
            acc[tag] = [];
          }
          acc[tag].push(rest);
          return acc;
        }, {});

          this.articles = groupedData.article
          this.allNews = groupedData.news
          this.announcements = groupedData.announcement
        })
        .catch(err=>{
          console.log(err)
        })
      },
      search(){
        axios.get('https://mikrobotacademy.com/api/students/search/' + this.searchQuery
        ).then(response =>{
          this.students = response.data
        }).catch(error =>{
          console.log(error.response)
        })
      },
      truncateData(data, count) {
        if (!data) return "";
        return data.substring(0, count);
      },
      handleArticle(id){
        this.$router.push({ name: 'article', params: {article: id }})
      },
      handleNews(url){
        window.location.href=url
      },
      parseData(article){
      const parser = new edjsParser();
        let articleJson = JSON.parse(article)
        const firstParagraphBlock = articleJson.blocks.find(block => block.type === 'paragraph');
        const markup = parser.parseBlock(firstParagraphBlock);
        return markup
    }
    }, 
    computed:{

    }
}
</script>

<style scoped>
p{
  font-weight: 200 !important;
}

h1,h2,h3,h4,h5,h6{
  font-weight: 400 !important;
}

.card-margin {
    margin-bottom: 1.875rem;
}

.card-footer a{
  color: #fff;
  transition: background-color 0.3s cubic-bezier(0.47, 0, 0.745, 0.715); 
}
.card-footer a:hover{
  background-color: #306102 !important;
}

.card {
    border: 0;
    box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #ffffff;
    background-clip: border-box;
    border: 1px solid #e6e4e9;
    border-radius: 8px;
    height: 90%;
}

.card .card-header.no-border {
    border: 0;
}
.card .card-header {
    background: none;
    padding: 0 0.9375rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    min-height: 50px;
}
.card-header:first-child {
    border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.widget-49 .widget-49-title-wrapper {
  display: flex;
  align-items: center;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  font-weight: 500;
  font-size: 1.5rem;
  background-size: cover;
  background-position: 0px;
  background-repeat: no-repeat;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0fafb;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #68CBD7;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-pro-title {
  color: #3c4142;
  font-size: 14px;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-meeting-time {
  color: #B1BAC5;
  font-size: 13px;
}

.widget-49 .widget-49-meeting-points {
  font-weight: 400;
  font-size: 13px;
  margin-top: .5rem;
}


.widget-49 .widget-49-meeting-action {
  text-align: right;
}

.widget-49 .widget-49-meeting-action a {
  text-transform: uppercase;
}




.vueperslide__image {
    background-size: contain !important;
    background-repeat: no-repeat;
}
.vueperslides__inner {
  height: 2in;
}
.vueperslide__title {
  font-weight: bold;
}
.vueperslide__content {
  width: 70%;
}
.vueperslides__arrow svg{
  color: yellow !important;
  width: 2.9em;
}
.vueperslide{
  height: 2in;
}
@media (max-width: 767px) {
  .vueperslide__title {
  font-size: 90%;
}
.vueperslide__content {
  font-size: 60%;
}
  .vueperslide{
   height: inherit;
  }
  .vueperslides__inner {
   height: inherit;
  }
}
.ex--center-mode {
  width: 600px;
  max-width: 100%;
  margin: auto;
}
</style>