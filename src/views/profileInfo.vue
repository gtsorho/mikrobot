<template>
  <div class="container newspaper">
    <div >
      <h1 class="text-center text-uppercase paper" style="font-size:70px">The Mikrobot Journal</h1>
    </div>
    <div>
      <h3 class="text-center border-top border-2  border-warning ">On Todays News Stands</h3>
    </div>
    <div>
      <h4 class="text-center bg-warning">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
    </div>
    <div class="my-4">
      <h2 style="font-size:40px" class="text-center">Meet Mikrobot's {{profile.name}}, {{calculateAge(profile.dob)}} Years Old</h2>
    </div>
    <div class="row">
      <div class="col-md-4 border border-warning" v-if="profile.image">
        <img :src="`https://mikrobots.miphost.com/profile_images/${ profile.image}`" style="height:4in; width:100%; object-fit:cover" alt="News Image" class="img-fluid">
      </div>
      <div class="col border-3 border-warning border-end">
        <h1 class="text-start">Profile</h1>
        <p>{{profile.profile}}</p>
      </div>
      <div class="col-md-4" v-if="profile.sub_profile">
        <p>{{profile.sub_profile}}</p>
      </div>
    </div>
  
    <div class="row p-3" v-if="profile.achievement">
      <div class="col-md-2 text-center">
        <i class="bi fs-1  bi-award text-warning"></i>
        <h5>Achievements</h5>
      </div>
      <div class="col-md-10 py-3">
        <p class="text-center d-inline">{{profile.achievement}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['student'],
  data() {
    return {
      profile:''
    }
  },
  created(){
    this.getStudent()
  },
  methods:{
    getStudent(){
      axios.get('https://mikrobots.miphost.com/api/students/student/'+this.student
      ).then(response =>{
        this.profile = response.data
        console.log(response.data)
      }).catch(error =>{
        console.log(error.response)
      })
    },
    calculateAge(birthdate){
      const currentDate = new Date();
      const birthDate = new Date(birthdate);

      let age = currentDate.getFullYear() - birthDate.getFullYear();

      // Adjust age if birthday hasn't occurred yet this year
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }
  }, 
}
</script>

<style scoped>  
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&family=Luckiest+Guy&family=Noticia+Text&family=Roboto+Slab:wght@100;200;400;500&display=swap');

  p, h1,h2,h3,h4,h5,div,span{
    font-family: 'Noticia Text', serif;
    font-weight: 200;
  }
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