<template>
   <div>
      <FormLayout>
         <template #title>Catégories</template>
         <FormLayoutRow v-for="c in categories" :key="c.id">
            <CategoryListItem :idEnveloppe="idEnveloppe" :category="c" />
         </FormLayoutRow>
         <FormLayoutRow v-if="adding">
            <CategoryListItem 
               :idEnveloppe="idEnveloppe" 
               :category="newCategory" 
               :startInEditMode="true"
               @cancel="newCancelled"
               @saved="newSaved" />
         </FormLayoutRow>
         <template #actions>
            <v-btn elevation="2" @click="add">
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </template>
      </FormLayout>
   </div>
</template>
<script>
import { onMounted, computed, ref, reactive } from '@vue/composition-api';

import store from 'store';

import CategoryListItem from './CategoryListItem';

export default {
  components: { CategoryListItem },
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   setup(props) {
      onMounted(async() => {
         store.dispatch('loadCategories', props.idEnveloppe);
      });

      const categories = computed(() => {
         return store.getters.getCategories(props.idEnveloppe);
      });

      const { add, adding, newCategory, newSaved, newCancelled } = useAddCategory();

      return {
         categories,
         add,
         adding,
         newCategory, 
         newSaved,
         newCancelled
      };
   }
}

function useAddCategory() {
   const adding = ref(false);
   const newCategory = reactive({ id: 0, name: '' });
   
   const add = function() {
      newCategory.id = 0;
      newCategory.name = '';
      adding.value = true;
   };

   const newSaved = () => {
      adding.value = false;
   };

   const newCancelled = () => {
      adding.value = false;
   };
   
   return { add, adding, newCategory, newSaved, newCancelled }
}
</script>