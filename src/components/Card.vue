<template>
  <div v-for="(item, i) in this.$store.state.cardData" :key="i">
    <div class="my-4">
      <div class="card mx-auto" style="width: 25rem; border-radius: 10px">
        <div class="author-profile">
          <p
            v-if="item.authorProfileUrl != 'none'"
            class="protifle-image"
            :style="{ backgroundImage: `url(${item.authorProfileUrl})` }"
          />
          <img
            v-else
            class="protifle-image-default"
            src="./../assets/images/profileDefault.png"
          />

          <router-link
            style="color: black; text-decoration-line: none"
            v-bind:to="{
              name: 'profile',
              params: { id: item.authorName },
            }"
          >
            <p class="profile-name">{{ item.authorName }}</p>
          </router-link>
        </div>
        <!-- <img
          class="upload-image"
          :style="{ backgroundImage: `url(${item.uploadImageUrl})` }"
        /> -->
        <div class="card-body" style="padding-top: 8px">
          <div class="mb-3" style="clear: both">
            <p class="card-text">{{ item.content }}</p>
          </div>
          <div class="buttons">
            <!-- <img
              v-bind:class="{
                liked: item.liked == true,
              }"
              class="buttons-likes"
              style="float: left; liked"
              src="./../assets/images/heart.black.png"
              @click="$store.commit('LikeToPost', item)"
            /> -->
            <img
              v-if="item.liked == true"
              class="buttons-likes"
              style="float: left; liked"
              src="./../assets/images/heart.png"
              @click="$store.commit('LikeToPost', item)"
            />
            <img
              v-else
              class="buttons-likes"
              style="float: left; liked"
              src="./../assets/images/heart.black.png"
              @click="$store.commit('LikeToPost', item)"
            />
            <p class="buttons-likes display-likes" style="float: left">
              {{ item.likes }}
            </p>
            <img
              @click="$store.commit('CheckChatRoomAndCreateChatRoom', item)"
              class="buttons-likes"
              src="./../assets/images/mail.png"
              style="float: left"
            />
          </div>
          <div style="clear: both"></div>
          <div>
            <p class="text-small card-text pt-1">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardData from "./../assets/dataCard";

export default {
  setup() {},
  data() {
    return {
      cardData: cardData,
    };
  },
  props: {},
  watch: {},
  methods: {
  },

  beforeCreate() {
    this.$store.commit("FetchPosts");
    this.$store.commit("FetchLikes");
  },
};
</script>

<style>
body {
  margin: 0px;
}
.author-profile {
  padding-top: 10px;
  padding-left: 10px;
  height: 50px;
}
.protifle-image {
  background-color: gray;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  background-size: cover;
  float: left;
}

.protifle-image-default {
  color: white;
  border-radius: 100px;
  height: 40px;
  float: left;
}

.profile-name {
  float: left;
  padding: 10px;
  padding-bottom: 0px;
  margin-bottom: 0px;
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
  filter: brightness(1.6);
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

.display-likes {
  width: 50px;
}

.liked {
  background: red;
}
</style>