import axios from "axios";

export default {
  state: {
    documentos: [],
    documentos_aceitos: [],
    documentos_nao_aceitos: [],
    documento_aceito: "",
    fetching: false,
    showOverlay: false,
  },
  getters: {
    getOverlay(state) {
      return state.showOverlay;
    },
    getDocumentos(state) {
      return state.documentos;
    },
    getDocumentosAceitos(state) {
      return state.documentos_aceitos;
    },
    getDocumentosNaoAceitos(state) {
      return state.documentos_nao_aceitos;
    },
    getDocumentoAceito(state) {
      return state.documento_aceito;
    },
    fetching(state) {
      return state.fetching;
    },
  },
  mutations: {
    SET_OVERLAY(state) {
      state.showOverlay = !state.showOverlay;
    },
    setDocumentosRurais(state, newValue) {
      state.documentos = newValue;
    },
    setDocumentosAceitos(state, newValue) {
      state.documentos_aceitos.push(newValue);
    },
    setDocumentosNaoAceitos(state, newValue) {
      state.documentos_nao_aceitos.push(newValue);
    },
    setDocumentoAceito(state, newValue) {
      state.documento_aceito = newValue;
    },
    setFetching(state) {
      state.fetching = !state.fetching;
    },
    DELETE_DOCUMENT(state, target) {
      // console.log("Target: ", target, state.documentos_aceitos);

      target.aprovado
        ? (state.documentos_aceitos = state.documentos_aceitos.filter((d, i) => target.docId != i))
        : (state.documentos_nao_aceitos = state.documentos_nao_aceitos.filter((d, i) => target.docId != i));
    },
  },
  actions: {
    async changeDocumentosRurais(context) {
      const api = import.meta.env.VITE_APP_API_ADDRESS;
      const URL = api + "/documentos_rurais";

      context.commit("setFetching");
      context.commit("SET_OVERLAY");

      await axios
        .post(URL)
        .then((r) => {
          context.commit("setDocumentosRurais", r.data);
          console.log(r.data);
          context.commit("setFetching");
          context.commit("SET_OVERLAY");
        })
        .catch((err) => {
          console.log("Erro fetching documentos rurais: ", err);
          context.commit("setFetching");
          context.commit("SET_OVERLAY");
        });
    },
  },
};
