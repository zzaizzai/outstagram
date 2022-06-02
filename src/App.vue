<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light sticky-top">
    <div class="navbar-center">
      <div class="container-fluid">
        <router-link
          style="color: black; text-decoration-line: none"
          class="navbar-brand float-left outstagram mx-5"
          to="/"
        >
          Outstagram
        </router-link>
        <div
          class="collapse navbar-collapse float-left mx-5"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page">
                <router-link to="/">
                  <img src="./assets/images/home.png" style="width: 25px" />
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page">
                <router-link to="/chat"
                  ><img src="./assets/images/mail.png" style="width: 25px" />
                </router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link
                  style="color: black; text-decoration-line: none"
                  to="/write"
                >
                  <img
                    src="./assets/images/write.png"
                    style="width: 25px" /></router-link
              ></a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <router-link
                  style="color: black; text-decoration-line: none"
                  v-bind:to="{
                    name: 'profile',
                    params: { id: $store.state.myUserData.userName },
                  }"
                >
                  <img
                    src="./assets/images/profile.png"
                    style="width: 25px" /></router-link
              ></a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link
                  style="color: black; text-decoration-line: none"
                  to="/signin"
                  >sign in</router-link
                ></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {};
  },
  created() {
    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    if(userInfo) {
      this.$store.commit('GetUserDataFromStorage', userInfo)
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-center {
  margin: auto;
}

.float-left {
  float: left;
}

.outstagram {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
