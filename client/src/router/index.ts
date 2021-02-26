import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import("@/views/Main/Main.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Auth/LoginView.vue")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Auth/RegisterView.vue")
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import("@/views/Workspace/WorkspaceMain.vue")
  },
  {
    path: '/workspace/:workspace',
    name: 'WorkspaceP',
    component: () => import("@/views/Channel/ChannelMain.vue")
  },
  {
    path: '/workspace/:workspace/:channel',
    name: 'Channel',
    component: () => import("@/views/Channel/ChannelView.vue")
  },
  {
    path: '/workspace/:workspace/:channel/:id',
    name: 'DM',
    component: () => import("@/views/DirectMessage/DirectmessageView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
