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
          <div class="col-md-3 col-sm-6 target">
              <i class="bi fs-1 bi-people"></i>
              <div class="num" data-increment="3" data-num="368">3000+</div>
              <h3>Students</h3>
              <p>Students served in 12 years; our academy epitomizes excellence.</p>
          </div>
          <div class="col-md-3 col-sm-6 target">
              <i class="bi fs-1 bi-buildings"></i>
              <div class="num" data-increment="56" data-num="6980">3</div>
              <h3>Brunches</h3>
              <p>Branches with Four student training categories each.</p>
          </div>
          <div class="col-md-3 col-sm-6 target">
              <i class="bi fs-1 bi-mortarboard"></i>
              <div class="num" data-increment="6" data-num="789">24</div>
              <h3>Instructors</h3>
              <p>Engineers pioneering STEM education through interactive robotics.</p>
          </div>
          <div class="col-md-3 col-sm-6 target">
              <i class="bi fs-1 bi-send"></i>
              <div class="num" data-increment="20" data-num="2450">5</div>
              <h3>Programs</h3>
              <p>Experiential STEM Programs for 21st century skills.</p>
          </div>
      </div>
        </div>



  </section>
  <section class="m-5" id="news">
    <h2>News | Updates</h2>
    <vueper-slides
      class="no-shadow"
      bullets-outside 
      transition-speed="250"
      :duration="5000"
      >
        <vueper-slide 
        class="text-light"
        v-for="(slide, i) in slides"
        :key="i"
        :content="!slide.image ? slide.content : null"
        :title="!slide.image ? slide.title : null"
        style="background-color: #004e7c"
        :image="slide.image ? slide.image : null">
        </vueper-slide>
    </vueper-slides>

    <div class="container d-flex justify-content-around"  v-if="articles.length > 0">
      <div class="row g-0 bg-body-secondary position-relative shadow rounded-1" style="width:3in; height:1in; overflow:hidden"  v-for="(article , i) in articles.slice(0, 4)" :key="i" >
        <div class="col-md-6 mb-md-0 p-md-2" style=" height:inherit !important;">
          <img :src="article.image ? article.image : 'src/assets/images/no-photos.png'"  style=" height:inherit !important;" class="w-100 object-fit-cover rounded-1">
        </div>
        <div class="col-md-6 p-2 ps-md-0"  style=" height:inherit !important;">
          <h6 style="font-size:15px" class="mt-0  text-truncate">{{article.header}}</h6>
          <p style="font-size:12px" class="">  {{truncateText(article.content, 8)}}</p>
          <a :href="article.url" class="stretched-link"></a>
        </div>
      </div>
    </div>
    
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

  export default {
      components:{
        VueperSlides,
         VueperSlide,
          Banner,
          Footer,
      },
      data() {
        return {
          articles:[],
          slides: [
            {
              title:'*****Christmas Break*****',
              content:"We at the Mikrobot Academy hereby informs guardians and students that we will be closed for the seasonal period from 16th December 2023 to 6th January 2024. We wish you a merry christmas and a prosperous new year " 
            },
            {
              image: new URL(`../assets/images/img2.jpg`,  import.meta.url).href,
            },
            {
              image: new URL(`../assets/images/lineup.jpg`,  import.meta.url).href,
            },
            {
              image: new URL(`../assets/images/img4.jpg`,  import.meta.url).href,
            }
          ],
        }
      },
      created(){
        axios.get('https://mikrobotacademy.com/api/news')
        .then(res =>{
          this.articles = res.data
        })
        .catch(err=>{
          console.log(err)
        })
      },
      methods: {
        truncateText(text, limit) {
        const words = text.split(' ');
        const truncatedWords = words.slice(0, limit);
        console.log(truncatedWords.join(' '))
        return truncatedWords.join(' ');
      }
    }
  }
</script>

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

