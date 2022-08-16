<template>
  <div>
    <h4 class="hide-on-print">Selecione abaixo os documentos apresentados:</h4>
    <HeaderComponent />
    <UserNotIdenfied @makeToast="makeToast" />
    <h4 class="text-center m-5">
      Análise de documentos para reconhecimento de atividade rural
    </h4>
    <b-row>
      <b-col> </b-col>
    </b-row>
    <div class="row">
      <div class="col-9">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon3"
            >Nome do(a)requerente:
          </span>
          <input type="text" class="form-control" v-model="nome_segurado" />
          <div class="hide-on-print">
            <span
              class="btn btn-primary bi-textarea-t"
              title="Colar texto do GET!"
              v-b-modal.modal-1
              v-b-tooltip.hover
            ></span>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-1"
      title="Colar texto do GET!"
      no-close-on-backdrop
      ok-only
      ok-title="Fechar"
    >
      <textarea
        style="width: 100%; resize: none"
        placeholder="Cole aqui o texto..."
        rows="10"
        @keyup="handlePasteText"
      ></textarea>

      <b-alert variant="warning" show>
        Dentro de uma tarefa principal do GET, tecle Ctrl+A (para selecionar
        tudo), Ctrl+C (para copiar), após clique dentro da caixa de texto acima
        e tecle Ctrl+V (para colar)
      </b-alert>
    </b-modal>
    <!-- END DIV ROW -->
    <div class="row mb-3">
      <div class="col-6">
        <div class="input-group">
          <span class="input-group-text">Espécie/NB</span>
          <input
            type="text"
            aria-label="Especie"
            class="form-control"
            maxlength="2"
            v-model="esp"
            v-mask="'##'"
          />
          <input
            type="text"
            aria-label="NB"
            class="form-control"
            v-model="nb"
            v-mask="'###.###.###-#'"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="input-group">
          <span class="input-group-text">GET</span>
          <input
            type="text"
            aria-label="Especie"
            class="form-control"
            v-model="get"
            id="get"
            @keyup="handleJustNumbers"
          />
        </div>
      </div>
    </div>

    <PeriodosComponent
      :datas_fim="datas_fim"
      :datas_ini="datas_ini"
      @addPeriodos="addPeriodos"
      @deletePeriodo="deletePeriodo"
    />

    <div v-if="datas_ini.length">
      <h4>Período(s)solicitados:</h4>
      <b-row v-for="(periodo, i) in datas_ini" :key="i"
        >{{ i + 1 }}: {{ handleData(datas_ini[i]) }} a
        {{ handleData(datas_fim[i]) }}
      </b-row>
    </div>
    <!-- END DIV ROW -->
    <ModalComponent
      :showModal="showModal"
      @hideModal="hideModal"
      @handleDocument="handleDocument"
      @makeToast="makeToast"
    />

    <DocsTablecomponent @showModal="toogleModal" />
    <DocsAprovadosTablecomponent @excluirDocumento="excluirDocumento" />
    <DocsNaoAprovadosTablecomponent @excluirDocumento="excluirDocumento" />
    <TextAreaComponent />

    <div class="text-center hide-on-print">
      <b-button
        variant="primary"
        class="mt-3 hide-on-print"
        size="lg"
        @click="redirectAnexoIV"
        v-if="user"
        >Emitir Anexo IV do Of. 46/2019.</b-button
      >
    </div>

    <ServidorComponent />
  </div>
  <!-- END DIV MAIN -->
</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
import DocsRuraisTablecomponent from "./DocsAprovadosTablecomponent.vue";
import DocsAprovadosTablecomponent from "./DocsAprovadosTablecomponent.vue";
import DocsTablecomponent from "./DocsTablecomponent.vue";
import ModalComponent from "./ModalComponent.vue";
import DocsNaoAprovadosTablecomponent from "./DocsNaoAprovadosTablecomponent.vue";
import { mapGetters } from "vuex";
import ServidorComponent from "./ServidorComponent.vue";
import UserNotIdenfied from "./UserNotIdenfied.vue";
import TextAreaComponent from "./TextAreaComponent.vue";
import { mask } from "vue-the-mask";
import PeriodosComponent from "./PeriodosComponent.vue";
import { formatDateWithMoment } from "../utils/Helpers";

export default {
  data() {
    return {
      showModal: false,
      nome_segurado: "",
      esp: "",
      nb: "",
      get: "",
      datas_ini: [],
      datas_fim: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      docs_aceitos: "getDocumentosAceitos",
      docs_nao_aceitos: "getDocumentosNaoAceitos",
    }),
  },
  methods: {
    deletePeriodo(index) {
      console.log("Delete this: ", index);

      this.datas_ini = this.datas_ini.filter((p, i) => i != index);
      this.datas_fim = this.datas_fim.filter((p, i) => i != index);
    },
    handleData(date) {
      return formatDateWithMoment(date);
    },
    addPeriodos(data_ini, data_fim) {
      if (!data_ini || !data_fim) {
        alert("Informe data inicial e final");
        return;
      }
      const dt_ini = moment(data_ini);
      const dt_fim = moment(data_fim);

      if (dt_ini.isAfter(dt_fim)) {
        alert("Data final menor do que data inicial!");
        return;
      }

      this.datas_ini.push(data_ini);
      this.datas_fim.push(data_fim);

      document.getElementById("data_ini").focus();
    },
    handleJustNumbers(e) {
      this.get = e.target.value.replace(/[^0-9]/gi, "");

      // this.$refs["my-modal-1"].hide();
    },
    handlePasteText(e) {
      try {
        let text = e.target.value;
        let protocolo = text
          .split("Tarefa de Protocolo:")[1]
          .split("- (Tarefa Principal)")[0]
          .trim();
        this.get = protocolo;

        let nb = text.split("NB")[1].split("Possui tempo especial?")[0].trim();
        this.nb = nb;

        let nome_t = text
          .split(
            "CPF	Nome Completo	Data de Nascimento	Nome Completo da Mãe	Contatos	Ação"
          )[1]
          .substr(15, 45)
          .trim()
          .split("/")[0];

        let nome = nome_t.replace(/[^a-z ]/gi, "");
        this.nome_segurado = nome;
      } catch {
        console.log("Erro analisando texto.");
      } finally {
        this.$bvModal.hide("modal-1");
      }
    },
    redirectAnexoIV() {
      if (!this.nome_segurado || !this.get || !this.esp || !this.nb) {
        alert("Informe nome, espécie/NB e GET!");
        return;
      }

      window.open(
        `https://teletrabalho.net/scpr/anexos/anexo_iv_of46.php?nome_segurado=${this.nome_segurado}&esp_nb=${this.esp}/${this.nb}&get=${this.get}`,
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    excluirDocumento(obj) {
      this.$store.commit("DELETE_DOCUMENT", obj);

      // console.log("Deleting: ", obj);
    },
    toogleModal() {
      this.showModal = !this.showModal;
      this.clearDocument = true;
    },
    hideModal() {
      this.showModal = false;
    },
    handleDocument(doc) {
      doc.is_valid
        ? this.$store.commit("setDocumentosAceitos", doc)
        : this.$store.commit("setDocumentosNaoAceitos", doc);

      this.$store.commit("setDocumentoAceito", "");

      // console.log("Tratando no component main: ", doc);
    },
    makeToast(variant = "success", title = "status", body = "") {
      this.$bvToast.toast(body, {
        title: title,
        autoHideDelay: 5000,
        appendToast: false,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
  },
  components: {
    HeaderComponent,
    DocsRuraisTablecomponent,
    DocsAprovadosTablecomponent,
    DocsTablecomponent,
    ModalComponent,
    DocsNaoAprovadosTablecomponent,
    ServidorComponent,
    UserNotIdenfied,
    TextAreaComponent,
    PeriodosComponent,
  },
  directives: {
    mask,
  },
};
</script>

<style>
.head-img-locale {
  display: none;
}
@media print {
  .hide-on-print {
    display: none;
  }
  .head-img-locale {
    display: block;
  }
}

#servidor_aux {
  bottom: 0;
  position: relative;
  width: 100%;
  text-align: center;
}
</style>