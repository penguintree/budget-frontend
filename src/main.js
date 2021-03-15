import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import CompositionApi from '@vue/composition-api';
import globals from './globalComponents';

Vue.config.productionTip = false;
Vue.use(CompositionApi);

for (let name in globals) {
   Vue.component(name, globals[name]);
}

new Vue({
   router,
   vuetify,
   render: h => h(App)
}).$mount('#app');
