import { createWebHistory, createRouter } from "vue-router";
import Chat from './components/Chat.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Show404 from './components/Show404.vue'
import Write from './components/Write.vue'

const routes= [
  {
    name: 'profile',
    path: "/profile/:id",
    component: Profile,
  },
  {
    path: "/chat",
    component: Chat,
  },
  {
    path: "/Write",
    component: Write,
  },

  {
    path: "/",
    component: Home,
  },
  {
    path: "/:404",
    component: Show404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router; 