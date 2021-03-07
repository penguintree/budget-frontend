import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/summary/:idEnveloppe',
      name: 'summary',
      props: propsIdEnveloppe,
      component: () => import('../views/Summary')
   },
   {
      path: '/list/:idEnveloppe',
      name: 'list',
      props: propsIdEnveloppe,
      component: () => import('../views/List')
   },
   {
      path: '/add/:idEnveloppe',
      name: 'add',
      props: propsIdEnveloppe,
      component: () => import('../views/Add')
   },
   {
      path: '/setup/:idEnveloppe',
      name: 'setup',
      props: propsIdEnveloppe,
      component: () => import('../views/EnveloppeSetup')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router

function propsIdEnveloppe(route){
   const idEnveloppe = +(route.params.idEnveloppe);
   return {
      idEnveloppe
   };
}
