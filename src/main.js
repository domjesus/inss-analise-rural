import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import { ModalPlugin } from "bootstrap-vue";
// Vue.use(ModalPlugin);
import "./bootstrap";

Vue.use(BootstrapVue);
// Vue.use(BootstrapVueIcons);

import store from "./store/store";

Vue.use(Vuex);

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
