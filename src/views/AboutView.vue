<template>
  <div class="about mt-5">
    <div class="parallax"></div>
    <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam debitis, dolores unde obcaecati sequi omnis ducimus adipisci assumenda consequatur cum veritatis, laudantium asperiores eaque quas quam eos totam voluptatem.</p> -->
    <div class="container  overflow-hidden py-5  text-start" style="background-color:#f2f2f2">
      <div class="row  g-5">
        <div class="col-sm-4">
            <p class="grey">Working Since 1976</p>
            <h2>Some words about</h2></div>
        <div class="col-sm-4">
            <p>Mellentesque habitant morbi tristique senectus et netus et malesuada famesac turpis egestas. Ut non enim eleifend felis pretium feugiat.</p>
        </div>
        <div class="col-sm-4">
            <p>Mellentesque habitant morbi tristique senectus et netus et malesuada famesac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi.</p>
            <h4><a href="about_me.html">Susana Jacobs</a></h4>
            <small>Startegy Manager</small>
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
                    <div class="num" data-increment="3" data-num="368">368</div>
                    <h3>Students</h3>
                    <p>Mellentesque habitant morbi tristique senectus et netus et malesuada.</p>
                </div>
                <div class="col-md-3 col-sm-6 target">
                    <i class="bi fs-1 bi-buildings"></i>
                    <div class="num" data-increment="56" data-num="6980">6 980</div>
                    <h3>Brunches</h3>
                    <p>Mellentesque habitant morbi tristique senectus et netus et malesuada.</p>
                </div>
                <div class="col-md-3 col-sm-6 target">
                    <i class="bi fs-1 bi-mortarboard"></i>
                    <div class="num" data-increment="6" data-num="789">789</div>
                    <h3>Instructors</h3>
                    <p>Mellentesque habitant morbi tristique senectus et netus et malesuada.</p>
                </div>
                <div class="col-md-3 col-sm-6 target">
                    <i class="bi fs-1 bi-send"></i>
                    <div class="num" data-increment="20" data-num="2450">2 450</div>
                    <h3>Programs</h3>
                    <p>Mellentesque habitant morbi tristique senectus et netus et malesuada.</p>
                </div>
            </div>
        </div>

    <div class="parallax"></div>


        <div class="container my-5">
            <div class="row inforow g-5 d-flex ">
                <div class="col-md-3 col-sm-4">
                    <h2>What We Do</h2>
                    <p class="grey">Dummy text of the printing and typesetting industry</p>
                </div>
                <div class="col-sm-4 offset-md-1">
                    <h3>Graphic Design</h3>
                    <p>Dummy text of the printing and<br> typesetting industry. Lorem Ipsum has<br> been the industry's standard dummy.</p>
                </div>
                <div class="col-sm-4">
                    <h3>Video Production</h3>
                    <p>Mellentesque habitant morbi tristique senectus et netus et malesuada famesac turpis egestas. </p>
                </div>
                <div class="col-sm-4 offset-md-4">
                    <h3>Web Development</h3>
                    <p>Dummy text of the printing and<br> typesetting industry. Lorem Ipsum has<br> been the industry's standard dummy.</p>
                </div>
                <div class="col-sm-4">
                    <a href="contact_1.html" class="btn btn-default">Get a Quote</a>
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
