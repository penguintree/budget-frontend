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
      async deleteEnveloppe({ commit }, idEnveloppe) {
         await enveloppeDataService.delete(idEnveloppe);
         commit('removeEneveloppe', { idEnveloppe });
      },
      async loadCategories({ commit, state }, idEnveloppe) {
         await unique.get(`loadCagegories-${idEnveloppe};`, async () => {
            if (state.categories.idEnveloppe !== idEnveloppe) {
               const categories = await categoryDataService.get(idEnveloppe);
               commit('categories', { idEnveloppe, categories });
            }
         });
      },
      async updateOrInsertCategory({ commit }, { idEnveloppe, category }) {
         const insert = !category.id;

         if(insert){
            category = await categoryDataService.post(idEnveloppe, category);
         } else {
            await categoryDataService.put(idEnveloppe, category.id, category);
         }

         commit('categories', { idEnveloppe, categories: [ category ] });
      },
      async deleteCategory({ commit }, { idEnveloppe, idCategory }) {
         await categoryDataService.delete(idEnveloppe, idCategory);

         commit('removeCategory', { idEnveloppe, idCategory });
      }
   },
   mutations: {
      enveloppes(state, { enveloppes }) {
         state.enveloppes.push(...enveloppes);
      },
      removeEneveloppe(state, { idEnveloppe }) {
         const index = state.enveloppes.findIndex(e => e.id === idEnveloppe);
         if(index >= 0) {
            state.enveloppes.splice(index, 1);
         }
      },
      categories(state, { idEnveloppe, categories }) {
         if (state.categories.idEnveloppe !== idEnveloppe) {
            state.categories.idEnveloppe = idEnveloppe;
            state.categories.data = [];
         }
         if (state.categories.data.length === 0) {
            state.categories.data.push(...categories);
         } else {
            for(let updated of categories) {
               const index = state.categories.data.findIndex(c => c.id === updated.id);
               if (index >= 0) {
                  state.categories.data.splice(index, 1, updated);
               } else {
                  state.categories.data.push(updated);
               }
            }
         }
      },
      removeCategory(state, { idEnveloppe, idCategory }) {
         if(state.categories.idEnveloppe !== idEnveloppe) return;

         const index = state.categories.data.findIndex(c => c.id === idCategory);
         if(index >= 0) {
            state.categories.data.splice(index, 1);
         }
      }
   }
});

export default store;
