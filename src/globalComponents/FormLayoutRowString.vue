<template>
   <DisplayEdit
      :value="editMode"
      @input="editModeChange"
      @cancel="cancel"
      @delete="onDelete"
   >
      <template #display>{{ model }}</template>
      <template #edit>
         <v-text-field
            ref="textField"
            label="Label"
            :rules="rules"
            v-model="model"
         />
      </template>
   </DisplayEdit>
</template>
<script>
import { ref, nextTick, onMounted } from '@vue/composition-api';

import { maxLength, required } from 'composables/useStringRules';
export default {
   props: {
      value: {
         type: String,
         required: true
      },
      maxLength: {
         type: Number,
         required: false,
         default: undefined
      },
      required: {
         type: Boolean,
         required: false,
         default: false
      },
      defaultToEditMode : {
         type: Boolean,
         required: false,
         default: false
      },
      saveAsync: {
         type: Function,
         required: true
      },
      deleteAsync: {
         type: Function,
         required: true
      }
   },
   setup(props, { emit }) {
      const textField = ref(null);
      const editMode = ref(props.defaultToEditMode);
      const model = ref(props.value);

      onMounted(() => {
         if (editMode.value) {
            textField.value.focus();
         }
      })

      const cancel = () => {
         model.value = props.value;
         editMode.value = false;
         emit('cancel');
      };

      const onDelete = async() => {
         await props.deleteAsync();
      }

      const editModeChange = async (newValue) => {
         if (newValue) {
            editMode.value = true;
            nextTick(() => { textField.value.focus() });
         } else {
            if (textField.value.validate()) {
               try {
                  await props.saveAsync(model.value);
                  emit('input', model.value);
                  editMode.value = false;
               } catch (err) {
                  // TODO : error handling :/
                  console.log(err);
               }
            }
         }
      };

      const rules = useValidationRules(props);

      return {
         textField,
         editMode,
         model,
         rules,
         editModeChange,
         cancel,
         onDelete
      };
   }
}

function useValidationRules(props) {
   const rules = [];
   if (props.required) {
      rules.push(required());
   }
   if (props.maxLength !== undefined) {
      rules.push(maxLength(props.maxLength));
   }

   return rules;
}
</script>