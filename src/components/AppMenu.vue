<template>
  <v-list dense nav>
    <v-list-group
      v-for="env in enveloppes"
      :key="env.id"
      prepend-icon="mdi-book-open-variant"
      no-action
    >
      <template #activator>
        <v-list-item-title>{{ env.name }}</v-list-item-title>
      </template>

      <v-list-item v-for="sub in subMenus" :key="sub.name" :to="subMenuTo(env.id, sub)" link>
        <v-list-item-action>
          <v-icon>{{ sub.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-action-text>{{ sub.text }}</v-list-item-action-text>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
<script>
import { onMounted, computed } from "@vue/composition-api";

import store from "store";

export default {
  setup() {
    onMounted(async () => {
      await store.dispatch("loadEnveloppes");
    });

    const enveloppes = computed(() => store.getters.enveloppes);

    const subMenus = [
      { name: "setup", icon: "mdi-cog", text: "Setup" },
      { name: "summary", icon: "mdi-chart-bar", text: "Sommaire" },
      { name: "list", icon: "mdi-format-list-bulleted", text: "Liste" },
      { name: "add", icon: "mdi-plus-circle", text: "Ajouter" },
    ];

    const subMenuTo = (idEnveloppe, subMenu) => {
       return {
          name: subMenu.name,
          params: { idEnveloppe }
       }
    };

    return {
      enveloppes,
      subMenus,
      subMenuTo
    };
  },
};
</script>