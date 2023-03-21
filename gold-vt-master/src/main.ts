import Vue from 'vue';

import App from '@/common/App/App.vue';

/* todo: unify plugin import and register */
import vuetify from './plugins/vuetify';
import './plugins/tinymce.plugin';
import './plugins/preview.plugin';
import './plugins/api.plugin';
import './plugins/outside.plugin';
import './plugins/vfs.plugin';
import './plugins/filters.plugin';
import './plugins/components.plugin';

import router from './router';

import '@/assets/common.scss';

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
