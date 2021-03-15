<template>
   <v-card >
      <v-card-title>
         <span class="headline"><slot name="title" /></span>
      </v-card-title>
      <v-card-text>
         <slot />
      </v-card-text>
      <v-card-actions>
         <v-spacer></v-spacer>
         <slot name="actions" />
      </v-card-actions>
   </v-card>
</template>
<script>
export default {
   
}
</script>