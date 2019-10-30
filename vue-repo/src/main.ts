import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/**引入vuetify 模块 */
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
/**字体 */
import '@mdi/font/css/materialdesignicons.css'

// import './guard.ts'


Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: h => h(App)
}).$mount("#app");
