<template>
    <div class="border border-danger rounded-1 shadow ">
          <div class="container my-5">
            <div class=" d-flex justify-content-between ">
            <input type="text" class="form-control form-control-sm rounded-pill my-3 w-25" v-model="searchQuery" @keyup="search" placeholder="Search by title" />
            <p class="my-3" style="font-size:13px">{{students.length}} Item(s) Found</p>
            </div>

        <div class="row">
            <div class="col-md-6">
            <div class="list-group border border-2 border-primary" style="max-height:5in !important; overflow-y:auto">
                <a href="#"  class="list-group-item border rounded-2 list-group-item-action my-2"  v-for="(student,i) in students" :key="i" @click="assignStudent(student), update= true" aria-current="true">
                <div class="row">
                    <div class="col-8">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{student.name}}</h5>
                        <small>{{calculateAge(student.dob)}} years old</small>
                    </div>
                    <p class="mb-1">{{ truncateData(student.profile,70)}}</p>
                    <small>{{student.guardian}} - ({{student.phone}})</small>
                    </div>
                    <div class="col-md-4 d-flex justify-content-center my-auto">
                    <img v-if="student.hasOwnProperty('image')" :src="`https://mikrobotacademy.com/profile_images/${ student.image}`" class="rounded-circle" style="width:5rem; height:5rem; object-fit:cover">
                    </div>
                </div>
                </a>
            </div>
            </div>
            <div class="col-md-6">
            <div class="row g-3">
                <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input type="text" v-model="student.name" class="form-control form-control-sm" id="name">
                </div>
                <div class="col-3">
                <label for="pp" class="form-label">Profile Picture</label>
                <input type="file" @change="handleImageChange"  class="form-control form-control-sm" id="pp" >
                </div>
                <div class="col-3">
                <label for="dob" class="form-label">Dob <span style="font-size:13px">({{new Date(student.dob).toDateString()}})</span></label>
                <input type="date" v-model="student.dob" class="form-control form-control-sm" id="dob" >
                </div>
                <div class="col-md-6">
                <label for="guardian" class="form-label">Parent</label>
                <input type="text" v-model="student.guardian" class="form-control form-control-sm" id="guardian" placeholder="Mr John">
                </div>
                <div class="col-6">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" v-model="student.phone" class="form-control form-control-sm" id="phone" placeholder="eg 0244456335">
                </div>
                <div class="col-12">
                <label for="exampleFormControlTextarea1" class="form-label">Profile</label>
                <textarea class="form-control" v-model="student.profile" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="col-6">
                <label for="exampleFormControlTextarea1" class="form-label">Sub Profile</label>
                <textarea class="form-control" v-model="student.sub_profile" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <div class="col-6">
                <label for="exampleFormControlTextarea1" class="form-label">Achievements</label>
                <textarea class="form-control" v-model="student.achievement" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
                <div class="col-12">
                <button type="button" v-if="update" @click="confirmDelete(student)" class="btn btn-sm float-start btn-outline-danger">Delete Student</button>
                <button type="button" v-if="!update" @click="submitForm()" class="btn btn-sm float-end btn-outline-primary">Add Student</button>
                <button type="button" v-else @click="updateProfile(student.id)" class="btn btn-sm float-end btn-outline-primary">Update {{student.name}}</button>
                <button type="button" v-if="update" @click="update = false, emptyStudent()" class="btn mx-1 btn-sm float-end btn-outline-dark">+</button>
                <p class="text-danger">{{errorMsg}}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import Editor from '../components/editor.vue'
import axios from 'axios'
export default {
    components:{
      Editor
    },
    data() {
        return {
         students:[],
         searchQuery:'',
         update:false,
         updateImg:false,
         errorMsg:null,
         student: {
          name:null,
          dob:null,
          guardian:null,
          phone:null,
          profile:null,
          sub_profile:null,
          achievement:null,
          image:null
         }
        }
    },  
    mounted(){
      this.getStudents()

    },
    methods:{
      getStudents(){
        axios.get('https://mikrobotacademy.com/api/students/'
        ).then(response =>{
          this.students = response.data
          console.log(response.data)
        }).catch(error =>{
          console.log(error.response)
        })
      },
      handleImageChange(event) {
        this.student.image = event.target.files[0];
        this.updateImg = true
      },
      search(){
        axios.get('https://mikrobotacademy.com/api/students/search/' + this.searchQuery
        ).then(response =>{
          this.students = response.data
        }).catch(error =>{
          console.log(error.response)
        })
      },
      submitForm() {
        let token = this.getCookie('token')

        const formData = new FormData();

        for (const key in this.student) {
          if (this.student.hasOwnProperty(key)) {
            formData.append(key, this.student[key]);
          }
        }

        axios.post('https://mikrobotacademy.com/api/students/', formData,
          { headers:{'Authorization': `Bearer ${token}`}}
          ).then(response =>{
            this.getStudents()
          }).catch(error =>{
            setInterval(() => {
              this.errorMsg = error.response.data
            }, 5000);
            this.errorMsg = ''
            })
      },
      updateProfile(id) {
        let token = this.getCookie('token')
        const formData = new FormData();

        if(!this.updateImg){
          delete this.student.image
        }


        for (const key in this.student) {
          if (this.student.hasOwnProperty(key)) {
            formData.append(key, this.student[key]);
          }
        }

        axios.post('https://mikrobotacademy.com/api/students/update/' + id, formData,
          { headers:{'Authorization': `Bearer ${token}`}}
          ).then(response =>{
            this.getStudents()
            this.emptyStudent
          }).catch(error =>{
            console.log(error.response)
          })
      },
      assignStudent(data){
        this.student  = data
        this.updateImg = false
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
      },
      truncateData(data, count) {
        return data.substring(0, count);
      },
      emptyStudent(){
        this.student = {
          name:'',
          dob:'',
          guardian:'',
          phone:'',
          profile:'',
          sub_profile:'',
          achievement:'',
          image:''
         }
      },
      confirmDelete(student) {
            const isConfirmed = window.confirm(`Are you sure you want to delete this profile`);

            if (isConfirmed) {
                this.deleteItem(student.id);
            } else {
                console.log('Deletion canceled.');
            }
        },
        deleteItem(id) {
          axios.get('https://mikrobotacademy.com/api/students/delete/' + id
          ).then(response =>{
            this.getStudents()            
          }).catch(error =>{
            console.log(error.response)
          })
        },
      getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
      },
        setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      },
    }, 
}
</script>

<style scoped>
p{
  font-weight: 200 !important;
}

h1,h2,h3,h4,h5,h6{
  font-weight: 400 !important;
}

.card-margin {
    margin-bottom: 1.875rem;
}

.card-footer a{
  color: #fff;
  transition: background-color 0.3s cubic-bezier(0.47, 0, 0.745, 0.715); 
}
.card-footer a:hover{
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
  font-size: 14px;
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