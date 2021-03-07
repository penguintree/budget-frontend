<template>
   <ul>
      <li v-for="e in enveloppes" :key="e.id">
         {{ e.name }}
      </li>
   </ul>
</template>
<script>
import { onMounted, computed} from '@vue/composition-api';

export default {
   setup(props, { root }) {
      onMounted(async () => {
         await root.$store.dispatch('loadEnveloppes');
      });

      const enveloppes = computed(() => root.$store.state.enveloppes);

      return {
         enveloppes
      };
   }
}
</script>