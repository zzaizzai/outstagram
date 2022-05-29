<template>
  <div class="modal-bg">
    <div class="modal-box bg-white">
      <form action="">
        <div class="modal-content">
          <textarea
            style="resize: none"
            type="text"
            id=""
            @input="uploadContent = $event.target.value"
          />
          <button type="button" @click="uploadMyPost">Upload</button>
        </div>
        <div class="message-error">
          {{ writeErrorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../main.js";

export default {
  data() {
    return {
      uploadContent: "",
      writeErrorMessage: "",
    };
  },
  methods: {
    uploadMyPost() {
      var myPost = {
        uid: "",
        authorName: this.$store.state.myUserData.userName,
        authorUid: this.$store.state.myUserData.uid,
        content: this.uploadContent,
        authorProfileUrl: this.$store.state.myUserData.userProfileurl,
        uploadImageUrl: "https://placeimg.com/640/480/animals",
        likes: 0,
        date: new Date(),
        liked: false,
      };

      if (this.uploadContent.length > 0) {
        // this.$store.state.cardData.unshift(myPost);
        uploadPost();
        this.$router.push("/");
      } else {
        this.writeErrorMessage = "write  more than one character";
      }

      function uploadPost() {
        db.collection("posts")
          .add(myPost)
          .then((result) => {
            console.log(myPost);
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
textarea {
  resize: none;
  height: 200px;
  width: 300px;
}
.modal-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}
.modal-box {
  width: 500px;
  height: 500px;
  margin: auto;
  margin-top: 10%;
  margin-bottom: 10%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}
.modal-content {
  margin: auto;
  margin-top: 20%;
  margin-bottom: 20%;
}
.message-error {
  color: red;
}
</style>