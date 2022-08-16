<template>
  <div>
    <!-- The modal -->
    <b-modal
      id="my-modal"
      backdrop
      no-close-on-backdrop
      v-model="showModalComputed"
      hide-footer
      size="xl"
      @hidden="$emit('hideModal')"
      @ok="$emit('hideModal')"
    >
      <div class="m-3">
        <div class="documento" v-if="documento">
          <label for="doc">Documento: </label>
          <h4>{{ documento }}</h4>
        </div>
        <div v-else>
          <b-input
            v-model="input_new_document"
            placeholder="Digite o nome do documento"
          >
          </b-input>
        </div>
      </div>

      <label for="dt_emissao">Data emissão: </label>
      <input type="date" v-model="dt_emissao" autofocus />

      <b-row>
        <h5 class="mt-3">O documento está em nome de:</h5>
        <b-col v-for="(titular_doc, i) in titulares_documentos" :key="i">
          <b-button
            variant="primary"
            @click="handleComponente($event)"
            :value="titular_doc"
            size="lg"
            >{{ titular_doc }}</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for="componente_atual"
            >Componente atual:
            {{
              componente
                ? componente
                : "selecione o titular do documento acima!"
            }}</label
          >
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label for="status">Status Documento: </label>
          <button
            class="btn btn-lg btn-success bi bi-hand-thumbs-up"
            v-b-popover.hover.top.info="'Documento válido!'"
            title="Status Documento"
            @click="setDocValido(true)"
          ></button>
          <button
            class="btn btn-lg btn-danger bi bi-hand-thumbs-down m-3"
            v-b-popover.hover.top.info="'Documento inválido!'"
            title="Status Documento"
            @click="setDocValido(false)"
          ></button>
        </b-col>
      </b-row>
      <b-row v-if="!doc_valido && componente">
        <b-col>
          <b-input-group prepend="Motivo" class="mt-3">
            <b-form-input v-model="motivo"></b-form-input>
            <b-input-group-append>
              <b-button variant="success" @click="handleDocInvalido"
                >Vai!</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      componente: "",
      dt_emissao: "",
      doc_valido: true,
      motivo: "",
      input_new_document: "",
      titulares_documentos: [
        "próprio",
        "pai",
        "mãe",
        "cônjuge",
        "filho(a)",
        "terceiro(a)",
      ],
    };
  },
  computed: {
    ...mapGetters({ documento: "getDocumentoAceito" }),
    showModalComputed: {
      get() {
        return this.showModal;
      },

      set() {},
    },
  },
  mounted() {
    this.data_emissao = "";
    //   console.log("Montando modal...");
  },
  methods: {
    setDocValido(status) {
      this.doc_valido = status;
      // console.log("Doc: ", !this.documento, "New: ", !this.input_new_document);

      if (
        !this.dt_emissao ||
        !this.componente ||
        (!this.documento && !this.input_new_document)
      ) {
        this.$emit(
          "makeToast",
          "danger",
          "Erro",
          "Informe o documento, data de emissão e titular do documento!"
        );
        return false;
      }

      if (!status) return;

      const documento = {
        doc_nome: this.documento ? this.documento : this.input_new_document,
        dt_emissao: this.dt_emissao,
        componente: this.componente,
        is_valid: this.doc_valido,
      };

      this.$emit("handleDocument", documento);
      this.$emit("hideModal");
      this.$emit(
        "makeToast",
        "success",
        "Status",
        "Documento informado com sucesso!"
      );
    },
    handleDocInvalido() {
      const documento = {
        doc_nome: this.documento ? this.documento : this.input_new_document,
        dt_emissao: this.dt_emissao,
        componente: this.componente,
        is_valid: this.doc_valido,
        motivo: this.motivo,
      };

      if (!this.motivo) {
        this.$emit("makeToast", "danger", "Erro", "Informe o motivo!");
        return;
      }

      this.$emit("handleDocument", documento);

      this.$emit("hideModal");
      this.$emit(
        "makeToast",
        "success",
        "Status",
        "Documento informado com sucesso!"
      );
    },
    handleComponente(e) {
      const comp = e.target.value;
      this.componente = comp;
      // console.log("Tratando comp: ", e.target.value);
    },
  },
};
</script>

<style>
</style>