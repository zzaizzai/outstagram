<template>
  <div class="mt-5 p-5 w-25 mx-auto">
    <div class="container mt-3">
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          placeholder="email"
          id="email"
          value="test@gmail.com"
          @change="inputEmail = $event.target.value"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          placeholder="pw"
          id="pw"
          value="password"
          @change="inputPassword = $event.target.value"
        />
      </div>
      <div class="p-3">
        <button
          type="submit"
          class="btn btn-primary m-3"
          id="login"
          @click="Login"
        >
          log In
        </button>
        <button
          type="submit"
          class="btn btn-danger m-3"
          id="logout"
          @click="Logout"
        >
          log Out
        </button>
      </div>

      <div type="text" class="flex-grow-1">
        <p class="error-message text-danger" id="error-message">
          {{ errorMessage }}
        </p>
        <p class="text-primary" id="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  data() {
    return {
      inputEmail: "test@gmail.com",
      inputPassword: "password",
      errorMessage: "error",
      successMessage: "success",
    };
  },
  methods: {
    checkLogin() {
      db.collection("test")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data().test);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Login() {
      var email = this.inputEmail;
      var password = this.inputPassword;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.successMessage = "Welcome Back";
          console.log(result);
          console.log("Welcome Back");
          this.$store.commit("SystemLogin");
          this.$router.push("/");
          window.sessionStorage.setItem("user", JSON.stringify(result));
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log(error);
          console.log("Failed to Sign In");
        });
    },
    Logout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          this.$store.commit("SystemLogout");
          window.sessionStorage.removeItem("user");
          console.log(result)
          console.log('logged out')
          this.successMessage = "Good bye";
        })
        .catch((error) => {
            console.log(error)
            console.log('failed to logged out')

        });
    },
  },
};
</script>

<style></style>
