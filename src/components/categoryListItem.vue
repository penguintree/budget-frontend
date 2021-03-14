<template>
   <FormLayoutRowString 
      v-model="category.name" 
      :max-length="50"
      required
      :defaultToEditMode="startInEditMode" 
      :saveAsync="saveCategory"
      @cancel="$emit('cancel')" />
</template>
<script>
import store from 'store';

export default {
   props: {
      idEnveloppe: {
         type: Number,
         required: true
      },
      category: {
         type: Object,
         required: true
      },
      startInEditMode: {
         type: Boolean,
         required: false,
         default () { return false; }
      }
   },
   setup(props, { emit }){
      const saveCategory = async (newName) => {
         const model = { id: props.category.id, name: newName }
         await store.dispatch('updateOrInsertCategory', { idEnveloppe: props.idEnveloppe, category: model });
         emit('saved');
      };

      return {
         saveCategory
      };
   }
};
</script>