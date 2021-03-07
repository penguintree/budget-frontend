import Vue from 'vue'
import Vuex from 'vuex'
import enveloppeDataService from 'dataServices/enveloppe.dataService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
     enveloppes: []
  }),
  actions: {
     async loadEnveloppes({ commit, state }) {
        if(state.enveloppes.length === 0) {
           const enveloppes = await enveloppeDataService.getAll();
           commit('enveloppes', { enveloppes })
        }
     }
  },
  mutations: {
     enveloppes(state, { enveloppes }) {
        state.enveloppes = enveloppes
     }
  }
})
