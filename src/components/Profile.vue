<template>
  <div class="mypage-box">
    <div style="margin-top: 100px">
      <img
        class="mypage-imag"
        alt=""
        :style="{
          backgroundImage: `url(${$store.state.myUserData.userProfileurl})`,
        }"
      />
    </div>
    <div>
      <p>{{ $store.state.myUserData.userName }}</p>
      <p>{{$store.state.myUserData.userContent}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: ''
    }
  },

  mounted(){
    this.user = this.$route.params.id

  }
};
</script>

<style>
.mypage-box {
  width: 500px;
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