<template>
   <v-row>
      <v-col>
         <template v-if="editMode"><slot name="edit" /></template>
         <template v-else><slot name="display" /></template>
      </v-col>
      <v-col cols="3">
         <template v-if="editMode">
            <v-btn fab small @click="toggle"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn fab small @click="$emit('cancel')"><v-icon>mdi-cancel</v-icon></v-btn>
         </template>
         <template v-else>
            <v-btn fab small @click="toggle"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn fab small @click="$emit('delete')"><v-icon>mdi-delete</v-icon></v-btn>
         </template>
      </v-col>
   </v-row>
</template>
<script>

import { computed } from '@vue/composition-api';

export default {
   model: {
      prop: 'value',
      event: 'input'
   },
   props: {
      value: {
         type: Boolean,
         required: false,
         default() {
            return false;
         }
      }
   },
   setup(props, { emit }){
      const editMode = computed(() => props.value);
      const toggle = function(){
         emit('input', !editMode.value)
      };

      return {
         editMode,
         toggle
      };
   }
}
</script>