<template>
  <div class="mypage-box">
    <div style="margin-top: 100px" class="p-4">
      <!-- <img
        v-if="profileProfileUrl != 'none'"
        class="mypage-imag"
        alt=""
        :style="{
          backgroundImage: `url(${profileProfileUrl})`,
        }"
      />
      <img
        v-else
        class="mypage-default-image"
        src="./../assets/images/profileDefault.png"
      /> -->
    </div>
    <div>
      <p>Name: {{ profileName }}</p>
      <p>Email: {{ profileEmail }}</p>
      <!-- <p>{{ profileUid }}</p> -->
      <div>
        url: <input type="text" name="" id="" v-model="profileProfileUrl" />
      </div>
      <div>comment:</div>

      <textarea type="text" placeholder="comment" v-model="profileContent" />
    </div>
    <button @click="UpdateProfile">Done</button>
  </div>
</template>

<script>
import { db } from "./../main.js";

export default {
  data() {
    return {
      profileName: this.$store.state.myUserData.userName,
      profileEmail: this.$store.state.myUserData.userEmail,
      profileUid: this.$store.state.myUserData.uid,
      profileContent: this.$store.state.myUserData.userContent,
      profileProfileUrl: this.$store.state.myUserData.userProfileurl,
    };
  },
  methods: {
    UpdateProfile() {
      console.log(this.profileProfileUrl);
      console.log("change your profile");

      db.collection("user")
        .doc(this.$store.state.myUserData.uid)
        .update({
          userContent: this.profileContent,
          userProfileurl: this.profileProfileUrl,
        });
      console.log("profile update done");
      console.log(this.profileContent);
      console.log(this.profileProfileUrl);

      var newProfile = {
        uid: this.profileUid,
        userName: this.profileName,
        userEmail: this.profileEmail,
        userProfileurl: this.profileProfileUrl,
        userContent: this.profileContent,
      };
      sessionStorage.setItem("user", JSON.stringify(newProfile));
       this.$store.commit('GetUserDataFromStorage', newProfile)

      this.$router.push("/profile/" +this.profileName );

    },
  },

  created() {},
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
.mypage-default-image {
  width: 150px;
  height: 150px;
  background-size: cover;
  border-radius: 100px;
  float: left;
}
</style>