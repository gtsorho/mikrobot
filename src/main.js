import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import Editor from 'vue3-editor-js';

// Import Bootstrap styles and icons
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

// Use the Vue Router
app.use(router);

// Use the vue-editor-js plugin
// app.use(Editor);

app.mount('#app');
  