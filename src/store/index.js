import Vue from 'vue';
import Vuex from 'vuex';
import enveloppeDataService from 'dataServices/enveloppe.dataService';
import categoryDataService from 'dataServices/category.dataService';

import UniqueAsync from 'blocks/UniqueAsync';

const unique = new UniqueAsync();

Vue.use(Vuex);

const store = new Vuex.Store({
   state: () => ({
      enveloppes: [],
      categories: {
         idEnveloppe: 0,
         data: []
      }
   }),
   getters: {
      enveloppes(state) {
         return state.enveloppes;
      },
      getCategories: (state) => (idEnveloppe) => {
         if (state.categories.idEnveloppe === idEnveloppe) {
            return state.categories.data;
         }
         return [];
      }
   },
   actions: {
      async loadEnveloppes({ commit, state }) {
         await unique.get('loadEnveloppes', async () => {
            if (state.enveloppes.length === 0) {
               const enveloppes = await enveloppeDataService.getAll();
               commit('enveloppes', { enveloppes })
            }
         });
      },
      async addEnveloppe({ commit }, model) {
         const enveloppe = await enveloppeDataService.post(model);
         commit('enveloppes', { enveloppes: [enveloppe] });
      },
      async loadCategories({ commit, state }, idEnveloppe) {
         await unique.get(`loadCagegories-${idEnveloppe};`, async () => {
            if (state.categories.idEnveloppe !== idEnveloppe) {
               const categories = await categoryDataService.get(idEnveloppe);
               commit('categories', { idEnveloppe, categories });
            }
         });
      }
   },
   mutations: {
      enveloppes(state, { enveloppes }) {
         state.enveloppes.push(...enveloppes);
      },
      categories(state, { idEnveloppe, categories }) {
         if (state.categories.idEnveloppe !== idEnveloppe) {
            state.categories.idEnveloppe = idEnveloppe;
            state.categories.data = [];
         }
         state.categories.data.push(...categories);
      }
   }
});

export default store;
