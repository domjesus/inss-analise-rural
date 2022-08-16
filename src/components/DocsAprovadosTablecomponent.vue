<template>
  <div>
    <table class="table">
      <thead class="text-center">
        <tr>
          <th colspan="6" class="bg-success">Documentos aceitos</th>
        </tr>
        <tr>
          <th scope="col">Seq</th>
          <th scope="col">Documento</th>
          <th scope="col">Componente do GF</th>
          <th scope="col">Data emissão</th>
          <th scope="col">Ano</th>
          <th scope="col" class="hide-on-print">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, i) in documentos" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ doc.doc_nome }}</td>
          <td>{{ doc.componente.toUpperCase() }}</td>
          <td>
            {{
              doc.dt_emissao
                ? new Date(doc.dt_emissao).toLocaleDateString()
                : ""
            }}
          </td>
          <td>
            {{ doc.dt_emissao ? new Date(doc.dt_emissao).getFullYear() : "" }}
          </td>
          <td class="hide-on-print">
            <b-button
              variant="danger"
              @click="$emit('excluirDocumento', { aprovado: true, docId: i })"
              ><i class="bi-trash"></i
            ></b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DocsRuraisTablecomponent",
  computed: {
    ...mapGetters({
      documentos: "getDocumentosAceitos",
    }),
  },
};
</script>

<style>
</style>