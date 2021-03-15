<template>
   <v-container>
      <CenteredRow>
         <CategoryList :idEnveloppe="idEnveloppe" />
      </CenteredRow>
      <CenteredRow>
         <EnveloppeDeleteForm :idEnveloppe="idEnveloppe" />
      </CenteredRow>
   </v-container>
</template>
<script>

import CategoryList from 'components/CategoryList';
import EnveloppeDeleteForm from 'components/EnveloppeDeleteForm';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   components: {
      CategoryList,
      EnveloppeDeleteForm
   }
}
</script>