import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

app.use(store);
app.use(router);
app.mount('#app');

import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA-qRQRJWMQXeJ1Yz-jXznuFbP6Wwsmk44",
    authDomain: "reactshop-1b014.firebaseapp.com",
    projectId: "reactshop-1b014",
    storageBucket: "reactshop-1b014.appspot.com",
    messagingSenderId: "641641592746",
    appId: "1:641641592746:web:2b22787cb6ddf305299dd3"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();