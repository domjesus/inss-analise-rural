<template>
  <div class="m-4 hide-on-print">
    <div v-if="user.name">
      <b-input-group>
        <b-input-group-text>Usuario</b-input-group-text>
        <b-input :value="user.name" disabled> </b-input>
        <b-button variant="danger" size="sm" @click="clearInfos"
          ><i class="bi bi-box-arrow-right">Sair</i></b-button
        >
      </b-input-group>
    </div>
    <div v-else class="text-center">
      <h6>
        Usuario NAO identificado. Informe o Siape para recuperar os dados.
      </h6>
      <b-input-group class="col-3">
        <b-input-group-text>Siape: </b-input-group-text>
        <b-input @keyup="setSiape($event)" maxlength="7"></b-input>
        <b-input-group-append>
          <!-- <span class="bi-search"></span> -->
          <button class="btn-primary" @click="dispatchUser">
            <i class="bi-arrow-right"></i>
          </button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { clearUserInfos } from "../utils/Helpers";
export default {
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  methods: {
    dispatchUser() {
      if (!this.user.siape || this.user.siape.length < 7) {
        this.$emit(
          "makeToast",
          "danger",
          "Erro!",
          "Informe a matrícula com 7 posições!"
        );
        return false;
      }

      this.$store.dispatch("changeUser");
    },
    setSiape(e) {
      this.$store.commit("SETUSER", { siape: e.target.value });
    },
    clearInfos() {
      clearUserInfos();
    },
  },
};
</script>

<style>
</style>