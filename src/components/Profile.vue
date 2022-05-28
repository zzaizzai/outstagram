<template>
  <div class="mypage-box">
    <div style="margin-top: 100px" class="p-4">
      <img
        class="mypage-imag"
        alt=""
        :style="{
          backgroundImage: `url(${$store.state.myUserData.userProfileurl})`,
        }"
      />
    </div>
    <div>
      <p>Name: {{ $store.state.myUserData.userName }}</p>
      <p>Email: {{ $store.state.myUserData.userEmail }}</p>
      <p>Comment: {{ $store.state.myUserData.userContent }}</p>
      <p>{{ $store.state.myUserData.uid }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },

  mounted() {
    this.user = this.$route.params.id;
  },
};
</script>

<style>
.mypage-box {
  width: 500px;
  height: 500px;
  border-radius: 20px;
  margin: auto;
  background: cornsilk;
}
.mypage-imag {
  width: 150px;
  height: 150px;
  background-size: cover;
  border-radius: 100px;
  float: left;
}
</style>