<template>
   <v-list>
      <v-list-item v-for="c in categories" :key="c.id">
         <v-list-item-title>{{ c.name }}</v-list-item-title>
      </v-list-item>
   </v-list>
</template>
<script>
import { onMounted, computed } from '@vue/composition-api';

import store from 'store';

export default {
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

      return {
         categories
      };
   }
}
</script>