import Vue from 'vue';
import ApiService from '@/services/api';

Vue.prototype.$apiService = ApiService;
Vue.prototype.$api = Vue.prototype.$apiService.api;
