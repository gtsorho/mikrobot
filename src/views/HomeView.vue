<template>
  <div> 
    <Banner/>
  <section class="services-section my-5">
    <div class="services-warp">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="service-item">
              <div class="si-head">
                <div class="si-icon d-flex justify-content-center">
                  <img src="../assets/images/industrial-robot(1).png" style="width:25%" class="my-3" alt >
                </div>
              </div>
              <p>Mikrobot Academy excels in innovative robotics training, fostering creativity through hands-on experiences led by expert instructors</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-item">
              <div class="si-head">
                <div class="si-icon d-flex justify-content-center">
                  <img src="../assets/images/code.png" style="width:25%" class="my-3" alt >
                </div>
              </div>
              <p>Mikrobot Academy excels in coding and software development training, empowering students through hands-on projects led by experienced instructors.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-item">
              <div class="si-head">
                <div class="si-icon d-flex justify-content-center">
                  <img src="../assets/images/3d-printer.png" style="width:25%" class="my-3" alt >
                </div>
              </div>
              <p>The Academy excels in Additive Manufacturing and 3D Printing, guiding students through hands-on projects using cutting-edge technology.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-item">
              <div class="si-head">
                <div class="si-icon d-flex justify-content-center">
                  <img src="../assets/images/drone.png" style="width:25%" class="my-3" alt >
                </div>
              </div>
              <p>Elevate skills in drone technology through hands-on piloting training, led by seasoned instructors at Mikrobot Academy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section class="video-section spad mt-5">
    <div class="container">
      <div class="row" >
        <div class="col-lg-6">
          <div class="video-text">
            <h2>Who Are We?</h2>
            <p>
              "At Mikrobot Academy, we revolutionize learning with a hands-on approach, engaging students in contextualized activities that provide immediate feedback. This dynamic strategy not only quenches the thirst for success but also nurtures lasting motivation. With a proven track record of serving over 3000 students across elementary, junior, and senior high school levels, both nationally and internationally, our academy is a beacon of excellence in education."
            </p>
          </div>
        </div>
        <div class="col-lg-6" style="height:inherit">
          <div class="video-box set-bg d-flex justify-content-lg-end justify-content-sm-center" style="height:inherit">
            <img src="../assets/images/boys.png" style="height:3.2in">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="testimonial-section my-5 ">
    <div class="container">
      <div class="row inforow text-center">
        <div class="row inforow text-center">
                <div class="col-md-3 col-sm-6 target" v-for="(fact, i) in facts" :key="i">
                    <i :class="fact.icon"></i>
                    <div class="num" data-increment="3" data-num="368">{{fact.figure}}</div>
                    <h3>{{fact.title}}</h3>
                    <p>{{fact.description}}</p>
                </div>
            </div>
      </div>
    </div>



  </section>
    <section class="m-5" id="news">
      <swiper  :autoplay="{ delay: 2500, disableOnInteraction: false,}" :pagination="{ type: 'progressbar', }" :navigation="true" :modules="modules" class="mySwiper">
          <swiper-slide class="slide" v-for="(slide, i) in announcements"
              :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${slide.image ? `https://mikrobotacademy.com/news_images/${slide.image}` : null})` }" :key="i">
              <div class="container hero-item overlay">
                  <a class="post-category-marker" style="  background: rgb(228, 107, 0);">Announcement</a>
                  <div class="clearfix"></div>
                  <h2><a href="post-single.html" class="text-light fw-bolder">{{ slide.header }}</a></h2>
                  <p style="font-size:14px" class="text-light fw-medium">{{ slide.content }} </p>
                  <div class="clearfix"></div>
                  <p class="post-date font-bold fw-normal" style="font-size:12px ;color: #fff;"><i
                          class="bi bi-clock-fill" style="color: rgb(228, 107, 0);"></i> {{ convertDate(slide.updatedAt) }}</p>
              </div>
              <router-link class="nav-link post-category-marker" style="  background: rgb(228, 107, 0); font-weight:600; font-size:15px;letter-spacing: .08rem;" :to="{name:'news'}">More News...</router-link>
          </swiper-slide>
      </swiper> 
  </section>
        

  <Footer/>
  </div>
</template>
<script>
// import Slideshow from '../components/slideshow.vue'
import Banner from '../components/banner.vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import Footer from "../components/foot.vue"
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation , Autoplay} from 'swiper/modules';


  export default {
      components:{
        VueperSlides,
         VueperSlide,
          Banner,
          Footer,
          Swiper,
          SwiperSlide,
      },
      data() {
        return {
          modules: [Pagination, Navigation, Autoplay],
          articles:[],
          allNews:[],
          facts:[],
          announcements: [],
          noImage: new URL(`../assets/images/no-photos.png`,  import.meta.url).href,
        }
      },
      created(){
        this.getNews()
        this.getFacts()
      },
      methods: {
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
        truncateText(text, limit) {
          const words = text.split(' ');
          const truncatedWords = words.slice(0, limit);
          return truncatedWords.join(' ');
      },
      getFacts() {
            axios.get('https://mikrobotacademy.com/api/facts',
            ).then(response => {
                this.facts = response.data
            }).catch(error => {
                console.log(error.response)
            })
            },
            convertDate(date) {
            const event = new Date(date);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return event.toLocaleDateString('en-US', options)
        }
    }
  }
</script>

<style scoped>
.hero-item {
    text-align: start;
    max-width: 7in !important;
    margin: 7%;
    color: #fff !important;
}
.swiper-button-next,
.swiper-button-prev {
    right: var(--swiper-navigation-sides-offset, 10px);
    left: auto;
}
.hero-item .post-category-marker {
    float: left;
    margin: 0 0 10px 0;

}

.post-category-marker {
    padding: 6px 13px;
    border-radius: 2px;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.6);
}


.swiper {
    width: 100%;
    height: 4in;
}

.swiper-slide {
    text-align: start;
    background: #fff;
    color: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
<style>

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
  color: yellow;
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
.feature-box img{
    height: 2.5in;
    object-fit: cover;
}
.features-section{
  background-image:linear-gradient(45deg, #001f52, transparent), url('../assets/img/pumpbg.jpg')!important;
}
.testimonial-bg{
background-size: contain;    
}

</style>

