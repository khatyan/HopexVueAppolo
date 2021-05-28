import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { createProvider } from './vue-apollo'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueAuthImage from 'vue-auth-image';
 
// register vue-auth-image directive
Vue.use(VueAuthImage);
 
// set Authorization header used by axios
var authHeader = "Basic aG9wZXh1c2VyOlRlc3RAMTIz";
axios.defaults.headers.common['Authorization'] = authHeader;
axios.defaults.headers.common['x-hopex-context'] =  " {\"EnvironmentId\":\"M6LC(Gp3VzSP\",\"RepositoryId\":\"ihd7)1IVRXR9\",\"ProfileId\":\"757wuc(SGjpJ\"}";


Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
