<template>
   <div>
      <CategoryList :idEnveloppe="idEnveloppe" />
      <EnveloppeDeleteForm :idEnveloppe="idEnveloppe" />
   </div>
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