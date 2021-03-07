import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import CompositionApi from '@vue/composition-api';

import FormLayout from 'blocks/FormLayout';
import FormLayoutRow from 'blocks/FormLayoutRow';

Vue.config.productionTip = false;
Vue.use(CompositionApi);

Vue.component('FormLayout', FormLayout);
Vue.component('FormLayoutRow', FormLayoutRow);

new Vue({
   router,
   vuetify,
   render: h => h(App)
}).$mount('#app');
