<template>
   <MainLayout>
      <template #header>
         <v-toolbar-title>Application</v-toolbar-title>
      </template>
      <template #drawer>
         <AppMenu />
         <EnveloppeAddForm />
      </template>
      <template #default>
         <router-view></router-view>
      </template>
      <template #footer> footer </template>
   </MainLayout>
</template>
<script>
// import MainLayout from 'blocks/MainLayout';
import AppMenu from 'components/AppMenu';
import EnveloppeAddForm from 'components/EnveloppeAddForm';

export default {
   name: "App",
   components: {
      // MainLayout,
      AppMenu,
      EnveloppeAddForm
   },
   setup(props, context) {
      context.root.$vuetify.theme.dark = true;
   }
};
</script>
