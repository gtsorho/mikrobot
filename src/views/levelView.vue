<template>
  <div class="container position-relative " >
    <!-- First Div: Text on the left, Image on the right -->
    <div class="row d-flex align-content-center border-info border-bottom" id="elementary">
      <div class="col-md-6 col-sm-12 h-100">
        <img src="../assets/images/spike.jpg" alt="Image" class="img-fluid" />
      </div>
      <div class="col-md-6 col-sm-12 d-flex" >
        <div class="my-auto">
          <label class="fs-4 mb-3" for="">Elementary(8-11 years)</label>
          <p>Students will engage in inquiry-based investigations that teach lessons in designing, building and programming robots.  Students develop leadership, teamwork and project management skills that prepare them for the future work force. The robotics curriculum is based on the Global Mathematics, Science and Technology standards.</p>
        </div>
      </div>
    </div>

    <!-- Second Div: Image on the right, Text on the left -->
    <div class="row d-flex align-content-center  border-danger border-bottom" id="junior">
      <div class="col-md-6 col-sm-12 h-100 order-md-2">
        <img src="../assets/images/junior.jpg" alt="Image" class="img-fluid" />
      </div>
      <div class="col-md-6 col-sm-12 order-md-1 6 d-flex text-end">
        <div class="my-auto">
          <label class="fs-4 mb-3" for="">Junior(12-14 years)</label>
          <p>Students will work in groups to build and test increasingly complex autonomous robots. The purpose of this course is to offer a fun and practical approach to the learning of Science, Technology, Engineering and Mathematics and aid students to apply their STEM knowledge acquired effectively in solving real life problems. </p>
        </div>
      </div>
    </div>

    <!-- Third Div: Text on the right, Image on the left -->
    <div class="row d-flex align-content-center" id="senior">
      <div class="col-md-6 col-sm-12 h-100">
        <img src="../assets/images/senior.jpg" alt="Image" class="img-fluid" />
      </div>
      <div class="col-md-6 col-sm-12 d-flex">
        <div class="my-auto">
          <label class="fs-4 mb-3" for="">Senior(15-19 years)</label>
          <p> Students design, construct and program autonomous robot that can solve specific challenges on a field. Students create their own innovative intelligent robotics solution relating to the pressing societal needs. There is no restriction on the use of materials. This includes free choice of controllers, motors, sensors, etc.</p>
        </div>
      </div>
    </div>
      <!-- <video class=" position-absolute  top-50"  width="50%" autoplay loop muted >
          <source src="../assets/images/product_selection_prime.mp4" type="video/mp4">
          Your browser does not support the video tag.
      </video> -->
  </div>
</template>

<script>
export default {
  name: "ResponsiveDivs",
};
</script>

<style scoped>
    .row{
          height: 100vh;
    }
    p{
        font-weight: 200;
    }
    label{
        font-weight: 300;
    }
    img{
      height: inherit;
      object-fit: cover;
    }
    @media (max-width: 767px) {
      .h-100{
        height: initial !important;
      }
    }
</style>
