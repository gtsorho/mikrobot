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
            <small>Founder</small>
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

    <div class="parallax"></div>


        <div class="container my-5">
            <div class="row inforow g-5 d-flex ">
                <div class="col-md-3 col-sm-4">
                    <h2>What We Do</h2>
                    <p class="grey">We create deep thinkers using a tacit – ‘knowledge in action’ learning approach with keen interest in technology and to sustain their interest while they continue through university and onward to future careers in STEM related jobs</p>
                </div>
                <div class="col-sm-4 offset-md-1">
                    <h3>Robotics Training</h3>
                    <p>At Mikrobot Academy, our cornerstone lies in Robotics Training, where innovation meets education. Our curriculum is meticulously designed to immerse students in the world of robotics, providing hands-on experiences that foster creativity and problem-solving skills. Our expert instructors, seasoned in the field of robotics, guide students through a journey of discovery, from understanding foundational concepts to designing and building their robots. The training sessions are dynamic, interactive, and tailored to each student's pace, ensuring a comprehensive grasp of robotics principles. At Mikrobot Academy, we're not just teaching robotics; we're nurturing the next generation of innovators and thinkers in this exciting field.</p>
                </div>
                <div class="col-sm-4">
                    <h3>Coding & Software Dev.</h3>
                    <p>our commitment to excellence extends to Coding and Software Development training. Our curriculum is finely crafted to introduce students to the world of programming languages, software architecture, and application development. Led by our adept instructors, who possess a wealth of industry experience, our sessions empower students to grasp coding fundamentals and delve into the intricacies of software design. Through hands-on projects and real-world simulations, students learn to create, debug, and optimize code, honing their problem-solving abilities along the way.</p>
                </div>
                <div class="col-sm-4 ">
                    <h3>Additive Manufacturing and 3D Printing.</h3>
                    <p>our expertise extends to Additive Manufacturing and 3D Printing, offering students an immersive journey into the world of cutting-edge technology. Our specialized curriculum is meticulously crafted to delve into the intricacies of 3D printing, from understanding design principles to hands-on creation using advanced additive manufacturing techniques. Guided by our experienced instructors, who possess a deep understanding of this evolving field, students explore the limitless possibilities of additive manufacturing. Through practical projects and innovative exercises, students learn to conceptualize, design, and bring their ideas to life using state-of-the-art 3D printing technology.</p>
                </div>
                <div class="col-sm-4">
                    <h3>Drone Tech & Piloting.</h3>
                    <p>we soar beyond limits with our Drone Technology and Piloting training. Our program is tailored to unveil the fascinating world of drones, from understanding their mechanics to mastering the art of piloting. Led by seasoned instructors deeply rooted in the field, our sessions blend theoretical knowledge with practical applications. Students delve into the intricacies of drone technology, learning about flight dynamics, safety protocols, and aerial navigation. Through hands-on exercises and simulated flights, our students gain proficiency in piloting drones, honing their skills in maneuvering and capturing aerial perspectives. Mikrobot Academy isn't just about drones; it's about fostering the next generation of skilled and responsible drone pilots ready to explore new horizons.</p>
                </div>
            </div>
        </div>
        
  </div>
</template>

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
