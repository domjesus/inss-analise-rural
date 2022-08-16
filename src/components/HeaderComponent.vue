<template>
  <div class="head-img-locale text-center">
    <img src="https://teletrabalho.net/scpr/brasao_pq.png" />
    <h6>Instituto Nacional do Seguro Social</h6>
    <div class="localization mb-5">
      GEX {{ user.gex }} <br />
      {{ user.ol_nome }} - {{ user.ol_numero }} <br />
      {{ user.cidade }} - {{ new Date().toLocaleDateString() }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
};
</script>

<style>
</style>