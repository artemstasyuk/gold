import { IS_DEV } from '@/consts';

export default IS_DEV
  ? [
      {
        name: 'dev',
        path: '/dev',
        component: () => {
          return import('@/pages/Dev/Dev.vue');
        }
      },
      {
        name: 'devForm',
        path: '/dev/form',
        component: () => {
          return import('@/pages/Dev/DevForm.vue');
        }
      }
    ]
  : [];
