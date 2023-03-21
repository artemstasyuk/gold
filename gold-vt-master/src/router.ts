import Vue from 'vue';
import Router, { RawLocation } from 'vue-router';
import { reaction } from 'mobx';
import LoginPage from '@/pages/Login/Login.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import NotFoundPage from '@/pages/Error/NotFound.vue';
import FileManager from '@/pages/FileManager/FileManager.vue';
import EmbeddedFileManager from '@/pages/FileManager/EmbeddedFileManager.vue';
import AuthService from '@/services/AuthService';

/**/
import DevRoutes from '@/pages/Dev/routes';

/* static User routes, no need to generate */
import UserRoutes from '@/pages/Entity/User/routes';

/* import generated file with all routes */
import EntityRoutes from '@/pages/Entity/routes';
import { FILE_MANAGER_EMBEDDED_PATH } from '@/consts/filemanager';

// Fix NavigationDuplicated error
const originalPush = Router.prototype.push;

Router.prototype.push = function push (location: RawLocation) {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};
// end fix

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    },
    {
      name: 'dashboard',
      path: '/',
      component: Dashboard
    },
    {
      name: 'file-manager',
      path: '/files',
      component: FileManager
    },
    {
      name: 'embedded-file-manager',
      path: FILE_MANAGER_EMBEDDED_PATH,
      component: EmbeddedFileManager
    },
    ...UserRoutes,
    ...EntityRoutes,
    ...DevRoutes,
    {
      name: 'notFound',
      path: '/404',
      alias: '*',
      component: NotFoundPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (AuthService.isAuth || to.name === 'login') {
    next();
  } else {
    next({ name: 'login', query: { back: to.fullPath } });
  }
});

/* Global reaction on removing auth token */
reaction(
  () => AuthService.isAuth,
  v => {
    !v && router.push({ name: 'login' });
  }
);

export default router;
