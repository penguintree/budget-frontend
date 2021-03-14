<template>
   <v-btn @click="deleteEnveloppe">delete</v-btn>
</template>
<script>
import store from 'store';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   setup(props, { root: { $router }}) {
      const deleteEnveloppe = async () => {
         await store.dispatch('deleteEnveloppe', props.idEnveloppe);
         $router.push('/');
      };

      return {
         deleteEnveloppe
      };
   }
}
</script>