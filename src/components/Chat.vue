<template>
  <div class="container p-4 mt-5">
    <div class="row">
      <div class="col-3">
        <ul class="list-group chat-list">
          <li class="list-group-item">
            <h6>currentChat: {{ currentChat }}</h6>
          </li>

          <div v-for="item in $store.state.chatDataList" :key="item">
            <li
              v-bind:class="{ active: currentChat == item.uid }"
              @click="
                currentChat = item.uid;
                checkChatOponent(item);
              "
              class="list-group-item"
            >
              <h6>Chat Oponent</h6>
            </li>
          </div>
        </ul>
      </div>

      <div class="col-6 p-3">
        <div>{{ chatOponent }}</div>
        <div class="chat-room">
          <ul class="list-group chat-content">
            <li><span class="chat-box">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
          </ul>
          <div class="input-group">
            <input class="form-control" id="chat-input" />
            <button class="btn btn-secondary">send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapState } from "vuex";

export default {
  name: "chat",
  data() {
    return {
      currentChat: 0,
      chatOponent: "Kim",
    };
  },
  methods: {
    checkChatOponent(payload) {
      if (payload.whoUid[0] == this.$store.state.myUserData.uid) {
        this.chatOponent = payload.who[1];
      } else if (payload.whoUid[1] == this.$store.state.myUserData.uid) {
        this.chatOponent = payload.who[0];
      }
    },
  },
};
</script>

<style>
.list-group-item-active {
  background-color: blue;
  border-color: blue;
  z-index: 2;
}
.chat-box {
  background: #eee;
  padding: 5px;
  border-radius: 5px;
  float: left;
}

.chat-content {
  height: 450px;
  overflow-y: scroll;
  padding: 10px;
}
.chat-content li {
  margin-top: 10px;
  list-style: none;
}
.mine {
  float: right;
  background: skyblue;
}
</style>