<template>
  <div class="container my-5">
    <div class=" d-flex justify-content-around ">
      <input type="text" class="form-control form-control-sm rounded-pill my-3 w-50" v-model="searchQuery"
        @keyup="search" placeholder="Search by title" />
      <p class="my-3" style="font-size:13px">{{ students.length }} Item(s) Found</p>
    </div>
    <ul class="nav nav-tabs my-4">
      <li class="nav-item">
        <a class="nav-link" :class="currentTab == 'directors' ? 'active' : ''" @click="currentTab = 'directors'"
          aria-current="page" href="#">Directors</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="currentTab == 'coaches' ? 'active' : ''" @click="currentTab = 'coaches'"
          href="#">Coaches</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="currentTab == 'students' ? 'active' : ''" @click="currentTab = 'students'"
          href="#">Students</a>
      </li>
    </ul>
    <div v-if="currentTab == 'students'" class="row row-cols-md-2 justify-content-center row-cols-lg-3">
      <div class="col-lg-4" v-for="(student, index) in students" :key="index">
        <div class="card card-margin">
          <div class="card-body pt-3" style="min-height:80%">
            <div class="widget-49">
              <div class="widget-49-title-wrapper">
                <div class="widget-49-date-primary"
                  :style="`background-image:url('https://mikrobotacademy.com/profile_images/${student.image}') !important`">
                </div>
                <div class="widget-49-meeting-info mx-auto" style="width: 70%;">
                  <p class="fst-italic m-0 text-muted">Meet:</p>
                  <h3 class="widget-49-pro-title fw-bold text-uppercase">{{ student.name }} <span class="float-end">Age:
                      {{ calculateAge(student.dob) }} yrs</span></h3>
                </div>
              </div>
              <p class="widget-49-meeting-points">{{ truncateData(student.profile, 200) }}</p>
            </div>
          </div>
          <div class="widget-49-meeting-action card-footer border-0 bg-transparent  d-flex justify-content-end">
            <router-link class="btn rounded-pill btn-sm px-4" style="background-color:#e6b600"
              :to="{ name: 'profileInfo', params: { student: student.id } }">View <i
                class="bi bi-arrow-right-short"></i></router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentTab == 'coaches'" class="row row-cols-md-2 justify-content-center row-cols-lg-3">
      <div class="col-lg-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"
       @click="selectedProfile = coach" v-for="(coach, index) in coaches" :key="index">
        <div class="card card-margin">
          <div class="card-body pt-3" style="min-height:100%">
            <div class="widget-49">
              <div class="widget-49-title-wrapper">
                <div class="widget-49-date-primary shadow m-2" style=" border-radius: 10px; width:7rem; height:7rem "
                  :style="`background-image:url('https://mikrobotacademy.com/profile_images/${coach.image}') !important`">
                </div>
                <div class="widget-49-meeting-info mx-auto" style="width: 100%;">
                  <p class="fst-italic m-0 text-muted">Meet:</p>
                  <h2 class="widget-49-pro-title fw-bold text-uppercase px-2 py-4 rounded-2"
                    style="background-image: linear-gradient(30deg, rgb(254, 254, 227), rgb(251, 251, 251));">
                    {{ coach.name }}</h2>
                </div>
              </div>
              <p class="widget-49-meeting-points text-center p-2 rounded-1">{{ truncateData(coach.profile, 400) }} ...</p>
            </div>
          </div>
          <!-- <div class="widget-49-meeting-action card-footer border-0 bg-transparent  d-flex justify-content-end">
                <router-link class="btn rounded-pill btn-sm px-4" style="background-color:#e6b600" :to="{ name: 'profileInfo', params: {student: student.id }}" >View <i class="bi bi-arrow-right-short"></i></router-link>
            </div> -->
        </div>
      </div>
    </div>
    <div v-if="currentTab == 'directors'" class="row row-cols-md-2 justify-content-center row-cols-lg-3">
      <div class="col-lg-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"
      @click="selectedProfile = director" v-for="(director, index) in directors" :key="index">
        <div class="card card-margin">
          <div class="card-body pt-3" style="min-height:100%">
            <div class="widget-49">
              <div class="widget-49-title-wrapper">
                <div class="widget-49-date-primary shadow m-2" style=" border-radius: 10px; width:7rem; height:7rem "
                  :style="`background-image:url('https://mikrobotacademy.com/profile_images/${director.image}') !important`">
                </div>
                <div class="widget-49-meeting-info mx-auto" style="width: 100%;">
                  <!-- <p class="fst-italic m-0 text-muted">Meet:</p> -->
                  <!-- <hr> -->
                  <h2 class="widget-49-pro-title fw-bold text-uppercase  px-2 py-4 rounded-2"
                    style="background-image: linear-gradient(30deg, rgb(254, 254, 227), rgb(251, 251, 251));">
                    {{ director.name }}</h2>
                </div>
              </div>
              <p class="widget-49-meeting-points text-center  p-2 rounded-1">{{ truncateData(director.profile, 400) }} ...
              </p>
            </div>
          </div>
          <!-- <div class="widget-49-meeting-action card-footer border-0 bg-transparent  d-flex justify-content-end">
                <router-link class="btn rounded-pill btn-sm px-4" style="background-color:#e6b600" :to="{ name: 'profileInfo', params: {student: student.id }}" >View <i class="bi bi-arrow-right-short"></i></router-link>
            </div> -->
        </div>
      </div>
    </div>
    <br><br>
    <br><br>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">Profile</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="widget-49">
        <div class="">
          <div class="shadow mx-auto" style=" border-radius: 50%; width:12rem; height:12rem; background-position: center center; background-size: cover;"
            :style="`background-image:url('https://mikrobotacademy.com/profile_images/${selectedProfile.image}') !important`">
          </div>
          <div class="widget-49-meeting-info mx-auto" style="width: 100%;">
            <p class="fst-italic m-0 text-muted">Meet:</p>
            <h2 class="widget-49-pro-title fw-bold text-uppercase px-2 py-1 rounded-2 text-center"
              style="background-image: linear-gradient(30deg, rgb(254, 254, 227), rgb(251, 251, 251)); font-size: 20px;">{{ selectedProfile.name }}
            </h2>
          </div>
        </div>
        <p class="widget-49-meeting-points text-center px-2 rounded-1">{{ selectedProfile.profile }}</p>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
export default {
  data() {
    return {
      students: [],
      currentTab: 'students',
      coaches: [],
      directors: [],
      searchQuery: '',
      selectedProfile: {}
    }
  },
  created() {
    this.getStudents()
  },
  methods: {
    // getStudents(){
    //   axios.get('https://mikrobotacademy.com/api/students/'
    //   ).then(response =>{
    //     this.students = response.data
    //   }).catch(error =>{
    //     console.log(error.response)
    //   })
    // },
    getStudents() {
      axios.get('https://mikrobotacademy.com/api/students/')
        .then(res => {
          const groupedData = res.data.reduce((acc, currentItem) => {
            const { tag, ...rest } = currentItem;
            if (!acc[tag]) {
              acc[tag] = [];
            }
            acc[tag].push({ tag, ...rest });
            return acc;
          }, {});

          this.students = groupedData.student
          this.coaches = groupedData.coach
          this.directors = groupedData.director
        })
        .catch(err => {
          console.log(err)
        })
    },
    search() {
      axios.get('https://mikrobotacademy.com/api/students/search/' + this.searchQuery)
        .then(res => {
          const groupedData = res.data.reduce((acc, currentItem) => {
            const { tag, ...rest } = currentItem;
            if (!acc[tag]) {
              acc[tag] = [];
            }
            acc[tag].push({ tag, ...rest });
            return acc;
          }, {});

          this.students = groupedData.student
          this.coaches = groupedData.coach
          this.directors = groupedData.director
        })
        .catch(err => {
          console.log(err)
        })
    },
    truncateData(data, count) {
      return data.substring(0, count);
    },
    calculateAge(birthdate) {
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
p {
  font-weight: 200 !important;
}

.nav-link {
  color: #004e7c;
}

.nav-link:active {
  color: #4b4b4b;
}

.nav-link:hover {
  color: #575757 !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400 !important;
}

.card-margin {
  margin-bottom: 1.875rem;
}

.card-footer a {
  color: #fff;
  transition: background-color 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
}

.card-footer a:hover {
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
  font-size: 16px;
  font-weight: 500;
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
</style>