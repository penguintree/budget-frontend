<template>
   <div class="enveloppe-form">
      <v-dialog persistent max-width="600px" v-model="dialog">
         <template #default>
            <v-form ref="form">
               <FormLayout>
                  <template #title>Créer une enveloppe</template>
                  <template #actions>
                     <v-btn text @click="close"> Annuler </v-btn>
                     <v-btn text @click="save"> Ok </v-btn>
                  </template>
                  <template #default>
                     <FormLayoutRow>
                        <v-text-field
                           label="Name"
                           :counter="255"
                           :rules="nameRules"
                           v-model="model.name"
                        ></v-text-field>
                     </FormLayoutRow>
                  </template>
                </FormLayout>
            </v-form>
         </template>
         <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" elevation="2" fab fixed bottom right>
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </template>
      </v-dialog>
  </div>
</template>
<style scoped>
.enveloppe-form {
  margin-bottom: 20px;
}
</style>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

import store from 'store';

export default {
   setup() {
      const dialog = ref(dialog);
      const model = reactive({ name: '' });

      onMounted(async() => {
         await store.dispatch('loadEnveloppes');
      });

      const nameRule = (value) => {
         if(!value || ! value.length || !value.trim().length) {
            return 'required';
         }
         if(value.length > 255) {
             return 'max 255 chars';
         }
         if (store.getters.enveloppes.find(e => e.name === value.trim())) {
             return 'duplicate';
         }

         return true;
      };
      const form = ref(null);

      const close = () => {
         model.name = '';
         dialog.value = false;
      };

      const save = async () => {
         if (form.value.validate()){
            await store.dispatch('addEnveloppe', model);
            close();
         }
      };

      return {
         form,
         dialog,
         model,
         save,
         close,
         nameRules: [nameRule]
      };
   },
};
</script>