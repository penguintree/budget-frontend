<template>
   <div>List {{ idEnveloppe }}</div>
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