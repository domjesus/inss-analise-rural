<template>
  <div class="hide-on-print">
    <b-row>
      <div class="col-6 mb-2">
        <div class="input-group">
          <span class="input-group-text">Período(s):</span>

          <b-button
            v-b-modal.add-periodos
            v-b-tooltip.hover
            title="Adicionar períodos"
            ><i class="bi-plus-circle"></i
          ></b-button>
          <b-modal id="add-periodos" ok-only ok-title="Fechar">
            <input type="date" v-model="data_ini" id="data_ini" /> a
            <input type="date" v-model="data_fim" />
            <b-button
              @click="$emit('addPeriodos', data_ini, data_fim)"
              class="mx-3"
              v-b-tooltip.hover
              title="Adicionar períodos"
            >
              <i class="bi-plus-circle"></i>
            </b-button>

            <b-row
              class="list-group-item"
              v-for="(periodo, i) in datas_ini"
              :key="i"
            >
              <b-col class="d-flex justify-content-between align-items-center"
                >Período {{ i + 1 }}: {{ handleData(datas_ini[i]) }} a
                {{ handleData(datas_fim[i]) }}
                <i
                  class="bi-trash btn btn-sm btn-danger"
                  @click="$emit('deletePeriodo', i)"
                ></i>
              </b-col>
            </b-row>
          </b-modal>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import { formatDateWithMoment } from "../utils/Helpers";
export default {
  name: "PeriodosComponent",
  props: ["datas_fim", "datas_ini"],
  data() {
    return {
      data_ini: "",
      data_fim: "",
    };
  },
  methods: {
    handleData(date) {
      return formatDateWithMoment(date);
    },
  },
};
</script>

<style>
</style>