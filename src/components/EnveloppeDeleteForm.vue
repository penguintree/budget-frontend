<template>
   <v-dialog v-model="dialog">
      <template #activator="{ on }">
         <v-btn v-on="on">delete</v-btn>
      </template>
      <template #default>
         Supprimer définitivement l'enveloppe ?
         <v-btn @click="deleteEnveloppe">oui</v-btn>
         <v-btn @click="dialog = false">non</v-btn>
      </template>
   </v-dialog>
</template>
<script>
import { ref } from '@vue/composition-api';

import store from 'store';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   setup(props, { root: { $router }}) {
      const dialog = ref(false);
      const deleteEnveloppe = async () => {
         await store.dispatch('deleteEnveloppe', props.idEnveloppe);
         $router.push('/');
      };

      return {
         deleteEnveloppe,
         dialog
      };
   }
}
</script>