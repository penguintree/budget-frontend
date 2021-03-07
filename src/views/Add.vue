<template>
   <div>add {{ idEnveloppe }}</div>
</template>
<script>
export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      }
   }
}
</script>