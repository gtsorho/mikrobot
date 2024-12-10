<template>
  <div class="about mt-5">
    <div class="parallax"></div>
    <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam debitis, dolores unde obcaecati sequi omnis ducimus adipisci assumenda consequatur cum veritatis, laudantium asperiores eaque quas quam eos totam voluptatem.</p> -->
    <div class="container  overflow-hidden py-5  text-start" style="background-color:#f2f2f2">
      <div class="row  g-5">
        <div class="col-sm-4">
            <p class="grey">Working Since 2012</p>
            <h2>Where Learning Transforms into Triumphs</h2></div>
        <div class="col-sm-4">
            <p>At Mikrobot Academy, our approach to learning is centered around concrete, contextualized activities that offer immediate feedback—a recipe for fulfilling a student's thirst for success and fostering enduring motivation. Having catered to over 3000 students spanning elementary, junior, and senior high school levels both nationally and internationally, our academy stands as a testament to excellence. </p>
        </div>
        <div class="col-sm-4">
            <p>Our students consistently showcase dedication, evident in their triumphs across diverse international competitions. Many have secured admissions to esteemed universities riding on the wings of robotics. Join us at Mikrobot Academy and be a part of this inspiring journey toward academic excellence and innovation!</p>
            <h4><a href="about_me.html">Ing. Wilson </a></h4>
            <small>Principal</small>
        </div>
      </div>
    </div>

    <div class="container my-5">
            <div class="row">
                <div class="page-header col-sm-8 col-sm-offset-2">
                    <h2>Facts &amp; Figures</h2>
                </div>
            </div>
            <div class="row inforow text-center">
                <div class="col-md-3 col-sm-6 target" v-for="(fact, i) in facts" :key="i">
                    <i :class="fact.icon"></i>
                    <div class="num" data-increment="3" data-num="368">{{fact.figure}}</div>
                    <h3>{{fact.title}}</h3>
                    <p>{{fact.description}}</p>
                </div>
            </div>
        </div>

    <div class="parallax"></div>
        <div class="container my-5">
            <div class="row inforow g-5 d-flex ">
                <div class="col-md-3 col-sm-4">
                    <h2>What We Do</h2>
                    <p class="grey">We create deep thinkers using a tacit – ‘knowledge in action’ learning approach with keen interest in technology and to sustain their interest while they continue through university and onward to future careers in STEM related jobs</p>
                </div>
                <div class="col-sm-4 offset-md-1">
                    <h3>Robotics Training</h3>
                    <p>Mikrobot Academy excels in Robotics Training, blending innovation with education. Our curriculum immerses students in robotics, fostering creativity through hands-on experiences. Led by expert instructors, our dynamic sessions cater to individual paces, ensuring a comprehensive understanding of foundational concepts and hands-on robot design. Mikrobot Academy goes beyond teaching robotics; we cultivate the next generation of innovators in this exciting field.</p>
                </div>
                <div class="col-sm-4">
                    <h3>Coding & Software Dev.</h3>
                    <p>Mikrobot Academy is committed to excellence in Coding and Software Development training. Our curriculum introduces students to programming languages, software architecture, and application development. Led by experienced instructors, our sessions empower students to grasp coding fundamentals and delve into software design intricacies. Through hands-on projects, students learn to create, debug, and optimize code, honing their problem-solving abilities.</p>
                </div>
                <div class="col-sm-4 ">
                    <h3>Additive Manufacturing and 3D Printing.</h3>
                    <p>Mikrobot Academy excels in Additive Manufacturing and 3D Printing, immersing students in cutting-edge technology. Our specialized curriculum explores 3D printing intricacies, from design principles to hands-on creation using advanced additive manufacturing techniques. Guided by experienced instructors, students delve into limitless possibilities in this evolving field. Through practical projects, they learn to conceptualize, design, and bring ideas to life using state-of-the-art 3D printing technology.</p>
                </div>
                <div class="col-sm-4 offset-md-4">
                    <h3>Drone Tech & Piloting.</h3>
                    <p>Mikrobot Academy excels in Drone Technology and Piloting training, unveiling the world of drones from mechanics to piloting. Led by seasoned instructors, our program blends theory with hands-on practice, covering flight dynamics, safety, and navigation. Through simulated flights and exercises, students gain proficiency, honing skills in maneuvering and aerial capture. Mikrobot Academy nurtures skilled, responsible drone pilots, fostering the next generation of aviation enthusiasts ready to explore new horizons. It's more than drones; it's about shaping the future of aviation.</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
    export default{
        data() {
            return {
                facts:[]
            }
        },
        created(){
                this.getFacts()
        },
        methods:{
            getFacts() {
            axios.get('https://mikrobotacademy.com/api/facts/',
            ).then(response => {
                this.facts = response.data
            }).catch(error => {
                console.log(error.response)
            })
            },
        }
    }
</script>

<style scoped>
p{
  font-weight: 200;
}
h1,h2,h3,h4,h5,h6{
  font-weight: 400;
}
.parallax {
  /* The image used */
  background-image: url("../assets/images/lineup.jpg");

  /* Set a specific height */
  min-height: 400px; 

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: 0px -300px;
  background-repeat: no-repeat;
  background-size: cover;
}
.about{
    scroll-behavior: smooth;
}
</style>
