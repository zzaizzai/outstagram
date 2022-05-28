import { createWebHistory, createRouter } from "vue-router";
import Chat from './components/Chat.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Show404 from './components/Show404.vue'
import Write from './components/Write.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
// import store from './store';

const routes = [
  {
    name: 'SignUp',
    path: "/signup",
    component: SignUp,

  },
  {
    name: 'SignIn',
    path: "/signin",
    component: SignIn,

  },
  {
    name: 'profile',
    path: "/profile/:id",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/chat",
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Write",
    component: Write,
    meta: {
      requiresAuth: true
    }
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

//check login state, if login state is false, redirect to signin page
router.beforeEach((to) => {
  var userData = JSON.parse(window.sessionStorage.getItem('user'))
  if (to.meta.requiresAuth && userData == null) {
    return {
      name: 'SignIn',
    }
  }
})


export default router; 