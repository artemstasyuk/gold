export default [
  {
    name: 'userList',
    path: '/users',
    component: () =>
      import('@/pages/Entity/User/List.vue'),
    meta: {
      breadcrumbs: ['dashboard', 'userList']
    }
  },
  {
    name: 'userEdit',
    path: '/users/:id/edit',
    component: () =>
  import('@/pages/Entity/User/Form.vue'),
    meta: {
      breadcrumbs: ['dashboard', 'userList', 'userEdit']
    }
  },
  {
    name: 'userAdd',
    path: '/users/add',
    component: () =>
  import('@/pages/Entity/User/Form.vue'),
    meta: {
      breadcrumbs: ['dashboard', 'userList', 'userAdd']
    }
  }
];
