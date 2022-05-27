<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <router-link style="color: black; text-decoration-line: none" to="/"
          >Outstagram</router-link
        >
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                Write</router-link
              ></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <router-link
                style="color: black; text-decoration-line: none"
                v-bind:to="{
                  name: 'profile',
                  params: { id: $store.state.myUserData.userID },
                }"
              >
                Profile</router-link
              ></a
            >
          </li>
        </ul>
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
  mounted() {},
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
</style>
