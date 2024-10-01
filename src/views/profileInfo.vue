<template>
  <div class="container newspaper">
    <div>
      <h1 class="text-center text-uppercase paper" style="font-size:70px">The Mikrobot Journal</h1>
    </div>    
    <div class="row">
      <div class="col-md-4">
        <!-- Placeholder for the image if available -->
        <img v-if="profile.image" 
             :src="`https://mikrobotacademy.com/profile_images/${ profile.image}`" 
             alt="Profile Image" 
             class="img-fluid rounded-0" 
             style="width:100%; object-fit:cover">
        <div v-else class="photo-placeholder text-center">
          <p>Photo Here (2.35x3.35in)</p>
        </div>
        
      </div>

      <!-- Text wrapped beside the image -->
      <div class="col-md-8">
        <div class="text-content">
          <h3 class="profile-title noticia-text-bold-italic"> {{profile.name}},<br> {{calculateAge(profile.dob)}} Years</h3>
          <p class="profile-text noticia-text-regular">{{ profile.profile }}</p>
          
          <!-- Sub-profile column -->
          <div v-if="profile.sub_profile" class="sub-profile  noticia-text-regular-italic">
            <p>{{ profile.sub_profile }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-2 text-start w-100" v-if="profile.achievement">
      <h5 class="noticia-text-bold">Achievements</h5>
      <p class="text-center achievements-text d-inline noticia-text-regular-italic">{{ profile.achievement }}</p>
    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noticia+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.newspaper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}


  .noticia-text-regular {
    font-family: "Noticia Text", serif;
    font-weight: 400;
    font-style: normal;
  }

  .noticia-text-bold {
    font-family: "Noticia Text", serif;
    font-weight: 700;
    font-style: normal;
  }

  .noticia-text-regular-italic {
    font-family: "Noticia Text", serif;
    font-weight: 400;
    font-style: italic;
  }

  .noticia-text-bold-italic {
    font-family: "Noticia Text", serif;
    font-weight: 700;
    font-style: italic;
  }


.paper {
  letter-spacing: 1px;
  font-weight: bold;
}



.row {
  display: flex;
  flex-wrap: wrap;
}

.text-content {
  column-count: 2;
  column-gap: 30px;
}

.profile-title {
  letter-spacing: 5px;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.profile-text, .sub-profile, .achievements-text {
  font-size: 14px;
  line-height: 1.3;
  text-align: justify;
  white-space: pre-line;
}

.img-fluid {
  border: 1px solid #252525;
}

.photo-placeholder {
  height: 350px;
  width: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: #888;
  border-radius: 0px;
  border: 1px dashed #1c1c1c;
}

.achievements {
  margin-top: 40px;
}
</style>




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
      axios.get('https://mikrobotacademy.com/api/students/student/'+this.student
      ).then(response =>{
        this.profile = response.data
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


  .paper{
    font-family: 'Luckiest Guy', cursive;
  }

    .newspaper {
      max-width: 1000px;
      margin: 20px auto;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      line-height: 1.6;
    }
</style>