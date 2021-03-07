<template>
   <CategoryList :idEnveloppe="idEnveloppe" />
</template>
<script>

import CategoryList from 'components/CategoryList';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   components: {
      CategoryList
   }
}
</script>