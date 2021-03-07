<template>
  <MainLayout>
    <template #header>
      <v-toolbar-title>Application</v-toolbar-title>
    </template>
    <template #drawer>
       <AppMenu />
    </template>
    <template #default>
      <router-view></router-view>
    </template>
    <template #footer> footer </template>
  </MainLayout>
</template>
<script>
import MainLayout from 'blocks/MainLayout';
import AppMenu from 'components/AppMenu';
export default {
  name: "App",
  components: {
    MainLayout,
    AppMenu
  },
};
</script>
