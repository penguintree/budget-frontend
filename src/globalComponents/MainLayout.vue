<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app clipped>
        <slot name="drawer" />
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <slot name="header" />
      </v-app-bar>

      <v-main>
        <slot />
      </v-main>

      <v-footer app>
        <slot name="footer" />
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
   data: () => ({
      drawer: null
   })
};
</script>