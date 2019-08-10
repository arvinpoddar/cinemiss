import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import VueNoty from 'vuejs-noty'
import "vuejs-noty/dist/vuejs-noty.css"

Vue.use(VueNoty)
Vue.config.productionTip = false

new Vue({
  router,
  data() {
    return {
      apiBase: "https://api.themoviedb.org/3/"
    }
  },
  render: h => h(App),
}).$mount('#app')
