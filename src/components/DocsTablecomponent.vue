<template>
  <div class="hide-on-print">
    <div class="alert alert-primary text-center" role="alert">
      <h4>Documentos Rurais - Art. 116 da IN 128/2022</h4>
    </div>

    <table class="table table-secondary table-hover">
      <thead class="text-center">
        <tr>
          <th scope="col">Documento</th>
          <th>
            <div class="input-group mb-3 col">
              <span class="input-group-text bi-search"></span>
              <input
                type="search"
                @keyup="filterDocs"
                v-model="filterText"
                placeholder="Pesquisar..."
                class="form-control"
                v-b-popover.hover.top.info="'Digite para filtrar documentos!'"
                title="Filtrar documentos"
              />
              <b-button
                class="bi-plus-circle btn btn-primary px-4"
                v-b-popover.hover.top.info="'Clique para adicionar documento!'"
                title="Adicionar Documento"
                @click="$emit('showModal')"
              >
              </b-button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="fetching" class="text-center">
          <td colspan="2">
            <b-overlay :show="showOverlay" rounded="sm">
              <b-card
                title="Aguarde"
                :aria-hidden="showOverlay ? 'true' : null"
              >
                <b-card-text>Carregando documentos rurais.</b-card-text>
              </b-card>
            </b-overlay>
          </td>
        </tr>
        <tr
          v-for="(doc, i) in docsFiltered"
          :key="i"
          @click="showModalAnaliseDoc(doc)"
          class="doc_row"
        >
          <td scope="row" colspan="2">
            {{ doc.nome_documento.split("-")[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DocsTablecomponent",
  data() {
    return {
      filterText: "",
      docsFiltered: [],
    };
  },
  watch: {
    documentos() {
      this.docsFiltered = this.documentos;
    },
  },
  computed: {
    ...mapGetters({
      documentos: "getDocumentos",
      fetching: "fetching",
      showOverlay: "getOverlay",
    }),
  },
  methods: {
    filterDocs() {
      // let docsTemp = this.documentos;

      this.docsFiltered = this.documentos.filter((d) =>
        d.nome_documento.toLowerCase().includes(this.filterText.toLowerCase())
      );
      // this.$store.commit("setDocumentosRurais", docsFiltered);
    },
    showModalAnaliseDoc(doc) {
      // console.log("Documento: ", doc);

      // this.$store.commit("setDocumentosAceitos", doc.nome_documento);
      this.$store.commit("setDocumentoAceito", doc.nome_documento);
      this.$emit("showModal");
    },
  },
};
</script>

<style>
.doc_row {
  cursor: pointer;
}
</style>