<template>
  <div class="container my-5">
  <div class="alert shadow-sm d-flex  justify-content-between rounded-1" role="alert">
    <div>
      <button class="btn btn-sm mx-2 px-3 rounded-1" @click="currentTab='Profile'">Profiles</button>
      <button class="btn btn-sm  mx-2 px-3 rounded-1" @click="currentTab='Editor'">Articles</button>
      <button class="btn btn-sm  mx-2 px-3 rounded-1" @click="currentTab='Facts'">Facts</button>
    </div>

    <button class="btn btn-sm rounded-1 mx-2 px-3 rounded-1" style="background-color: red;" @click="logout()">Logout</button>
  </div>

  <component :is="currentTab"></component>
<br><br>
<br><br>
</div>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" ref="modal" hidden data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Username</label>
          <input type="text" class="form-control form-control-sm"  v-model="user.username" id="formGroupExampleInput" placeholder="mikrobotAdmin">
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Password</label>
          <input type="password" class="form-control form-control-sm"  v-model="user.password" id="formGroupExampleInput2" placeholder="**********">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" ref="modalClose" class="btn btn-secondary" hidden data-bs-dismiss="modal">Close</button>
        <button type="button" @click="login()" class="btn btn-sm rounded-pill btn-primary">Login</button>
      </div>
    </div>
  </div>
</div>



</template>
<script>
import Editor from '../components/editor.vue'
import Profile from '../components/profiles.vue'
import Facts from '../components/facts.vue'


import axios from 'axios'
export default {
    components:{
      Editor,
      Profile,
      Facts
    },
    data() {
        return {
          currentTab:'Profile',
         user:{
          username:null,
          password:null
         },
        }
    },  
    mounted(){
      if(!this.getCookie('token') || this.getCookie('token') == 'null'){
        const trig = this.$refs.modal
        trig.click()
      }
    },
    methods:{
      login(){
        axios.post('http://localhost:3000/api/users/login', this.user
        ).then(response =>{
          this.setCookie('token', response.data, 1 )
          const trig = this.$refs.modalClose
          trig.click()
        }).catch(error =>{
          console.log(error.response)
        })
      },
      logout(){
        this.setCookie('token', null)
        location.reload();
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

          let sameSite = ";SameSite=None;Secure";

          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + sameSite;
        }
    }, 
}
</script>

<style scoped>
.btn-sm{
  background-color: rgb(0, 5, 47);
  color: #fff;
}
.btn-sm:hover{
  opacity: .9;
}
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