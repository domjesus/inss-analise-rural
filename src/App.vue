<template>
  <div class="container my-3">
    <MainLayout />
  </div>
</template>

<script>
import axios from "axios";
import MainLayout from "./components/MainLayout.vue";
import { getUserFromLocalStorage } from "./utils/Helpers";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  mounted() {
    const api = import.meta.env.VITE_APP_API_ADDRESS;
    axios
      .get(api.replace("/api", "") + "/sanctum/csrf-cookie")
      // axios
      // .get(api.replace("/api", "") + "/sanctum/csrf-cookie")
      .then((response) => {
        // Login...
        console.log("Token ok...");
      });
    const URL = api + "/login";

    // const user_credentials = {
    //   email: "domjesus@gmail.com",
    //   password: "wc150701",
    // };
    let user_credentials = {
      email: "jose@manoel.com",
      password: "12345678",
    };

    axios
      .post(URL, {
        user: user_credentials,
      })
      .then((r) => {
        console.log("Fetch result: ", URL, r.data);
      });

    console.log("Fetching: ", URL, window.axios.defaults);

    document.title = import.meta.env.VITE_APP_NAME;
    // console.log("Store: ", import.meta.env);
    this.$store.dispatch("changeDocumentosRurais");
    const user = getUserFromLocalStorage();
    if (user) this.$store.commit("SETUSER", user);
    // this.$store.dispatch("changeUser");
    // console.log("Store: ", this.$store.getters);
  },
  components: { MainLayout },
  methods: {
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>