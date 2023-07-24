import { useUserStore } from './../stores/userStore';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/management/devices',
        component: () => import('pages/Management/Device/DeviceList.vue'),
      },
      {
        path: '/user/client',
        component: () => import('pages/User/Client/ClientList.vue'),
      },
      {
        path: '/user/designer',
        component: () => import('pages/User/Designer/DesignerList.vue'),
      },
      {
        path: '/user/editor',
        component: () => import('pages/User/Editor/EditorList.vue'),
      },
      {
        path: '/user/operator',
        component: () => import('pages/User/Operator/OperatorList.vue'),
      },
      {
        path: '/user/coordinator',
        component: () => import('pages/User/Coordinator/CoordinatorList.vue'),
      },
      {
        path: '/',
        component: () => import('pages/Management/Device/DeviceList.vue'),
      },
      { path: '/trello', component: () => import('pages/TrellorPage.vue') },
    ],

    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    beforeEnter: (to, from, next) => {
      const store = useUserStore();
      if (store.isLoggedIn) next('/');

      next();
    },
  },
  {
    path: '/unauthorized',
    component: () => import('pages/Unauthorized.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
