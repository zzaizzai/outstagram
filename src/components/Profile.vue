<template>
  <div class="mypage-box">
    <div style="margin-top: 100px" class="p-4">
      <img
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
      />
    </div>
    <div>
      <p>Name: {{ profileName }}</p>
      <p>Email: {{ profileEmail }}</p>
      <p>Comment: {{ profileContent }}</p>
      <p>{{ profileUid }}</p>
      <h3 v-if="this.isProfileOwner==true" @click="ChangeYourProfile">+</h3>
    </div>
  </div>
</template>

<script>
import { db } from "./../main.js";

export default {
  data() {
    return {
      profileName: "",
      profileEmail: "",
      profileUid: "",
      profileContent: "",
      profileProfileUrl: "none",
      isProfileOwner: false,
    };
  },
  methods:{
    ChangeYourProfile(){
      console.log("change your profile")
    }

  },

  created() {
    this.profileName = this.$route.params.id;
    db.collection("user")
      .where("userName", "==", this.profileName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.profileName = doc.data().userName;
          this.profileEmail = doc.data().userEmail;
          this.profileUid = doc.data().uid;
          this.profileContent = doc.data().userContent;
          this.profileProfileUrl = doc.data().userProfileurl;

          if (this.profileUid == this.$store.state.myUserData.uid) {
            this.isProfileOwner = true;
          } else {
            return;
          }
        });
        console.log("you are owner: " + this.isProfileOwner);
      });

    //if you are profile owner, you can edit your profile
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
.mypage-default-image {
  width: 150px;
  height: 150px;
  background-size: cover;
  border-radius: 100px;
  float: left;
}
</style>