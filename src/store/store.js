import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import DocumentosRuraisModule from "./modules/DocumentosRuraisModule";
import UserModule from "./modules/UserModule";

export default new Vuex.Store({
  modules: {
    DocumentosRuraisModule,
    UserModule,
  },
});
