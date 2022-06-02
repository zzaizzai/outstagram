<template>
  <div class="mt-5 p-5 w-25 mx-auto">
    <div class="container mt-3">
      <div class="mb-3">
        <div class="mb-3">
          <input
            type="name"
            class="form-control"
            placeholder="name"
            id="name"
            @change="inputName = $event.target.value"
          />
        </div>
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
          @click="Register"
        >
          SignUp
        </button>
        <button type="submit" class="btn btn-danger m-3" id="logout">
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
      inputName: "",
      errorMessage: "",
      successMessage: "",
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

    Register() {
      var name = this.inputName;
      var checkNameExist = false;

      if (name.length < 4) {
        this.errorMessage = "name should be at least 4 characters";
        return;
      } else if (name.length > 20) {
        this.errorMessage = "name should be at most 20 characters";
        return;
      } else {
        db.collection("user")
          .where("userName", "==", name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().userName == name) {
                console.log("dd2");
                checkNameExist = true;
                this.errorMessage = "Error: " + name + " is already exists";
                return;
              }
            });
            if (checkNameExist == false) {
              this.ResisterFirebase();
            }
          });
      }
    },
    ResisterFirebase() {
      var email = this.inputEmail;
      var password = this.inputPassword;
      var name = this.inputName;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.user.uid);
          console.log("successfully Signed Up");
          window.sessionStorage.setItem("user", JSON.stringify(result));

          var inputUserData = {
            uid: result.user.uid,
            userEmail: email,
            userName: name,
            userProfileurl: "none",
            userContent: "Hello brothers sisters",
            role: "normal",
          };
          console.log(inputUserData);

          //save user info
          db.collection("user")
            .doc(result.user.uid)
            .set(inputUserData)
            .then(() => {
              console.log("successfully Saved User data");
              this.$router.push("/signin");
            })
            .catch((error2) => {
              console.log(error2);
            });
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log(error);
          console.log("failed to register");
        });
    },
  },
};
</script>

<style>
</style>