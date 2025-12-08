<template>
  <div class=" rounded-0  ">
    <div class="container my-5">
      <div class=" d-flex justify-content-between ">
        <p class="my-3" style="font-size:13px">{{ facts.length }} Item(s) Found</p>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="list-group " style="max-height:5in !important; overflow-y:auto">
            <a href="#" class="list-group-item  border-none rounded-0 shadow-sm list-group-item-action my-2"
              v-for="(fact, i) in facts" :key="i" @click="assignFact(fact), update = true" aria-current="true">
              <div class="row">
                <div class="col-8">
                  <div class="d-flex w-100 justify-content-start">
                    <button type="button " class="btn btn-sm" style="background-color: #00263d; color:white">
                      {{ fact.title }} <span class="badge text-bg-secondary">{{ fact.figure }}</span>
                    </button>
                  </div>
                  <p class="mb-1" style="font-size: 13px;">{{ fact.description }}</p>
                </div>
                <div class="col">
                  <i :class="fact.icon"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-md-6 shadow px-3 py-4 d-flex align-items-center" style="  height: max-content;">
          <div class="row g-3">
            <div class="col-md-9">
              <label for="name" style="font-size: 13px;" class="form-label fs-6">Title</label>
              <input type="text" v-model="fact.title" style="font-size: 13px;"
                class="form-control fw-light text-dark rounded-1 form-control-sm" id="name">
            </div>
            <div class="col-3">
              <label for="pp" style="font-size: 13px;" class="form-label fs-6">Figure</label>
              <input type="number" v-model="fact.figure" style="font-size: 13px;"
                class="form-control fw-light text-dark rounded-1 form-control-sm" id="name">
            </div>
            <div class="col-md-12">
              <label for="name" style="font-size: 13px;" class="form-label fs-6">Icon</label>
              <input type="text" v-model="fact.icon" style="font-size: 13px;" placeholder="eg. bi fs-1 bi-send (bootstrap icon)"
                class="form-control fw-light text-dark rounded-1 form-control-sm" id="name">
            </div>
            <div class="col-12">
              <label for="exampleFormControlTextarea1" style="font-size: 13px;"
                class="form-label fs-6">Description</label>
              <textarea style="font-size: 13px;" class="form-control fw-light text-dark rounded-1"
                v-model="fact.description" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
            <div class="col-12">
              <button type="button" @click="deleteItem(fact.id)" v-if="update" class="btn btn-sm rounded-0 float-start btn-outline-danger">Delete
                Fact</button>
              <button type="button" v-if="!update" @click="submitForm()"
                class="btn btn-sm rounded-0 float-end btn-outline-primary">Add Fact</button>
              <button type="button" v-else @click="updateFact(fact.id)"
                class="btn btn-sm rounded-0 float-end btn-outline-primary">Update {{ fact.title }}</button>
              <button type="button" v-if="update" @click="update = false, emptyFact()"
                class="btn mx-1 btn-sm rounded-0 float-end btn-outline-dark">+</button>
              <p class="text-danger">{{ errorMsg }}</p>
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
  components: {
    Editor
  },
  data() {
    return {
      facts: [],
      searchQuery: '',
      update: false,
      errorMsg: null,
      fact: {
        title: null,
        figure: null,
        description: null,
        icon:null
      }
    }
  },
  mounted() {
    this.getFacts()

  },
  methods: {
    getFacts() {
      axios.get('http://localhost:3000/api/facts/'
      ).then(response => {
        this.facts = response.data
      }).catch(error => {
        console.log(error.response)
      })
    },
    submitForm() {
      let token = this.getCookie('token')

      axios.post('http://localhost:3000/api/facts/', this.fact,
        { headers: { 'Authorization': `Bearer ${token}` } }
      ).then(response => {
        this.getFacts()
        this.emptyFact()
      }).catch(error => {
        this.errorMsg = error.response.data
        setInterval(() => {
          this.errorMsg = null
        }, 5000);
      })
    },
    updateFact(id) {
      let token = this.getCookie('token')

      axios.post('http://localhost:3000/api/facts/update/' + id, this.fact,
        { headers: { 'Authorization': `Bearer ${token}` } }
      ).then(response => {
        this.getFacts()
        this.emptyFact()
      }).catch(error => {
        console.log(error.response)
      })
    },
    emptyFact() {
      this.fact = {
        title: null,
        figure: null,
        description: null,
        icon:null
      }
    },
    deleteItem(id) {
      let token = this.getCookie('token')
      axios.get('http://localhost:3000/api/facts/delete/' + id,
        { headers: { 'Authorization': `Bearer ${token}` } }
      ).then(response => {
        this.getFacts()
      }).catch(error => {
        console.log(error.response)
      })
    },
    assignFact(data) {
      this.fact = data
    },
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
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
p {
  font-weight: 200 !important;
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

.form-control, .form-select{
  background-color: #d9d9d941;
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