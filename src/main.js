import Vue from 'vue';
import vuexI18n from 'vuex-i18n';
import VueResource from 'vue-resource';
import VueModal from 'vue-js-modal';
import AsyncComputed from 'vue-async-computed';
import Icon from 'vue-awesome/components/Icon';
import router from './router';
import store from './store';
import App from './components/app.vue';
import Loader from './components/loader.vue';
import {i18nstore, enUs} from './i18n';

Vue.component('icon', Icon);

Vue.use(vuexI18n.plugin, i18nstore);
Vue.use(VueResource);
// Vue.use(VueTypeahead);
Vue.use(VueModal);
Vue.use(Loader);
Vue.use(AsyncComputed);

// Add translations directly to Vue
Vue.i18n.add('en-us', enUs);

// Set the starting locale as well as the fallback
Vue.i18n.set('en-us');
Vue.i18n.fallback('en-us');

Vue.config.debug = true;
Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    store
});

export default app;
export {
    app
};
