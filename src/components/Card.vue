<template>
  <div v-for="(item, i) in this.$store.state.cardData" :key="i">
    <div class="my-4">
      <div class="card mx-auto" style="width: 25rem; border-radius: 10px">
        <div class="author-profile">
          <p
            class="protifle-image"
            :style="{ backgroundImage: `url(${item.authorProfileUrl})` }"
          ></p>
          <p class="profile-name">{{ item.authorName }}</p>
        </div>
        <img
          class="upload-image"
          :style="{ backgroundImage: `url(${item.uploadImageUrl})` }"
        />
        <div class="card-body">
          <p class="card-text" style="clear: both"></p>
          <div class="buttons">
            <img
              class="buttons-likes"
              style="float: left"
              src="./../assets/images/heart.black.png"
              @click="$store.dispatch('likeToPost', item)"
            />
            <p class="buttons-likes" style="float: left">
              {{ item.likes }}
            </p>
            <img
              src="./../assets/images/mail.png"
              style="float: left"
              class="buttons-message"
            />
          </div>
          <div style="clear: both">
            <p class="card-text">{{ item.content }}</p>
          </div>
          <div>
            <p class="text-small card-text pt-1" >{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardData from "./../assets/dataCard";

export default {
  data() {
    return {
      cardData: cardData,
    };
  },
  props: {},
};
</script>

<style>
body {
  margin: 0px;
}
.author-profile {
  padding-top: 10px;
  padding-left: 10px;
}
.protifle-image {
  background-color: gray;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  background-size: cover;
  float: left;
}
.profile-name {
  float: left;
  padding: 10px;
}

.buttons p {
  padding: 5px;
}

.buttons-likes {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.buttons-likes:hover {
  filter: brightness(1.2);
}

.buttons-message {
  width: 25px;
  margin-left: 10px;
  cursor: pointer;
}

.buttons-message:hover {
  color: black;
  filter: brightness(1.2);
}
.upload-image {
  width: 100%;
  height: 350px;
  background: gainsboro;
  background-size: cover;
  background-image: url("https://placeimg.com/400/400/nature");
}

.card-text {
  text-align: left;
}

.text-small {
  font-size: 12px;
  color: gray;
  margin-bottom: 0;
}

</style>