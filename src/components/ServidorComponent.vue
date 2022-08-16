<template>
  <div id="servidor_aux" class="mt-5" v-if="user.name">
    <div id="servidor">
      {{ user.name }}<br />
      {{ user.cargo }}<br />
      Matr&iacute;cula: {{ user.siape }}
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