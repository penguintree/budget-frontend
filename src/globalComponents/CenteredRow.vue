<template>
   <v-row>
      <v-spacer />
      <v-col :cols="cols">
         <slot />
      </v-col>
      <v-spacer />
   </v-row>
</template>
<script>
export default {
   props: {
      cols: {
         type: Number,
         required: false,
         default() { return 8; },
         validator(value) {
            return value > 0 && value < 13;
         }
      }
   }
};
</script>