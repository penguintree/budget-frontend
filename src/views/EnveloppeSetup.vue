<template>
   <EnveloppeSetupForm :idEnveloppe="idEnveloppe" />
</template>
<script>
import EnveloppeSetupForm from 'components/EnveloppeSetupForm';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   },
   components: {
      EnveloppeSetupForm
   }
}
</script>