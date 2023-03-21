import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import { prepareLocales } from '@/helpers/locales';

import Storage from '../services/StorageService';

import '@mdi/font/css/materialdesignicons.css';

import '../assets/vuetify-style-overrides.scss';

const locales = prepareLocales(import.meta.globEager('../**/*.json'));

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales,
    current: Storage.get('language') || Object.keys(locales)[0]
  }
});

export const $t = function (s: string): string {
  const lang = vuetify.framework.lang;

  return s
    ? lang.t(`$vuetify.${s}`, ...[...arguments].slice(1))
    : '';
};

/* make $t shortcut */
Vue.prototype.$t = $t;

export default vuetify;
