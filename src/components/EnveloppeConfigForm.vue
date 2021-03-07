<template>
   <v-form ref="form">
   </v-form>
</template>
<script>
import { ref } from '@vue/composition-api';

export default {
   setup(){
      const form = ref(null);

      return {
         form
      };
   }
}
</script>