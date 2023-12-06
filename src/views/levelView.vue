<template>
  <div class="container position-relative " >
    <!-- First Div: Text on the left, Image on the right -->
    <div class="row d-flex align-content-center border-info border-bottom" id="elementary">
      <div class="col-md-6 col-sm-12 h-100">
        <img src="../assets/images/spike.jpg" alt="Image" class="img-fluid" />
      </div>
      <div class="col-md-6 col-sm-12 d-flex" >
        <div class="my-auto">
          <label class="fs-4 mb-3" for="">Elementary(6-9 years)</label>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore tempora beatae porro maxime ipsam reiciendis, laboriosam adipisci minima, sit ab quod blanditiis cumque tenetur vel pariatur, praesentium sed sapiente. Text on the right</p>
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
          <label class="fs-4 mb-3" for="">Junior(6-9 years)</label>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore tempora beatae porro maxime ipsam reiciendis, laboriosam adipisci minima, sit ab quod blanditiis cumque tenetur vel pariatur, praesentium sed sapiente. Text on the right</p>
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
          <label class="fs-4 mb-3" for="">Senior(6-9 years)</label>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus inventore tempora beatae porro maxime ipsam reiciendis, laboriosam adipisci minima, sit ab quod blanditiis cumque tenetur vel pariatur, praesentium sed sapiente. Text on the right</p>
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
