<template>
  <div class="container p-4 mt-5">
    <div class="row">
      <div class="col-3">
        <ul class="list-group chat-list">
          <li class="list-group-item">
            <h6>currentChatUid: {{ currentChatUid }}</h6>
          </li>

          <div v-for="item in chatRoom" :key="item">
            <li
              v-bind:class="{ active: currentChatUid == item.uid }"
              @click="
                currentChatUid = item.uid;
                checkChatOponent(item);
                FetchMeesages(item.parentUid);
              "
              class="list-group-item chat-list-box"
            >
              <h6 v-if="item.who[0] == $store.state.myUserData.userName">
                {{ item.who[1] }}
              </h6>
              <h6 v-else>{{ item.who[0] }}</h6>
              <p class="chatroom-time">{{ item.lastDate }}</p>
            </li>
          </div>
          <button @click="FetchChatRoom">채팅방 패치</button>
        </ul>
      </div>

      <div class="col-6 p-3">
        <div>{{ chatOponent }}</div>
        <div class="chat-room">
          <div></div>
          <ul
            class="list-group chat-content"
            overflow-y:
            scroll
            ref="scrollMe"
            id="scrollMe"
          >
            <div v-for="message in chatContent" :key="message">
              <li>
                <div class="row">
                  <div>
                    <span
                      class="chat-date text-small"
                      v-bind:class="{
                        minedate:
                          $store.state.myUserData.uid ==
                          message.chatUserUidFrom,
                      }"
                      >{{ message.date }}</span
                    >
                  </div>

                  <div>
                    <span
                      class="chat-box"
                      v-bind:class="{
                        mine:
                          $store.state.myUserData.uid ==
                          message.chatUserUidFrom,
                      }"
                      >{{ message.chatContent }}</span
                    >
                  </div>
                </div>
              </li>
            </div>
            <!-- <li><span class="chat-box">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li> -->
          </ul>
          <div class="input-group">
            <input class="form-control" id="chat-input" v-model="sendMessage" />
            <button class="btn btn-secondary" @click="SendMessage">send</button>
          </div>
          <div class="down-button" style="font-size: 20px"  @click="ScrollToBottom">▽</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapState } from "vuex";
import { db } from "../main.js";

export default {
  name: "chat",
  created() {
    this.FetchChatRoom();
  },
  mounted() {
  },
  data() {
    return {
      sendMessage: "",
      currentChatUid: "",
      chatOponent: "Kim",
      chatOponentUid: "2",

      chatContent: [],
      chatRoom: [
        // {
        //   uid: "0",
        //   whoUid: ["0", "2"],
        //   who: ["admin", "Kims"],
        //   startDate: 22 - 5 - 20,
        //   lastDate: 22 - 5 - 30,
        // },
        // {
        //   uid: "1",
        //   whoUid: ["0", "3"],
        //   who: ["admin", "Elaski"],
        //   startDate: 22 - 5 - 21,
        //   lastDate: 22 - 5 - 31,
        // },
      ],
    };
  },
  methods: {
    ScrollToBottom() {
      let container = this.$el.querySelector("#scrollMe");
      container.scrollTop = container.scrollHeight;
      console.log("scrolltobottom");
    },
    SendMessage() {
      if (this.sendMessage.length == 0) {
        console.log("more than 1 character");
        return;
      }
      console.log("send");
      var sendMessageData = {
        parentUid: this.currentChatUid,
        chatUserUidFrom: this.$store.state.myUserData.uid,
        chatUserUidTo: this.chatOponentUid,
        chatContent: this.sendMessage,
        date: new Date(),
      };

      console.log(sendMessageData);
      db.collection("messages")
        .add(sendMessageData)
        .then(() => {
          this.sendMessage = "";
          console.log("successfully sended");
        })
        .catch(() => {
          console.log("Failed to send");
        });

      this.ScrollToBottom();

      db.collection("chatroom")
        .doc(this.currentChatUid)
        .update({ lastDate: sendMessageData.date });
    },

    // FetchMeesages(payload) {
    //   console.log(payload)
    //   db.collection("messages")
    //     .where("parentUid", "==", payload)
    //     .orderBy("date", "desc")
    //     .onSnapshot((result) => {
    //       this.chatContent.splice(0, this.chatContent.length);
    //       result.forEach((doc) => {
    //         this.chatContent.unshift(doc.data());
    //       });
    //       console.log('fetch message done')
    //     });
    // },
    async FetchMeesages() {
      console.log(this.currentChatUid);

      var getDB = new Promise((success) => {
        db.collection("messages")
          .where("parentUid", "==", this.currentChatUid)
          .orderBy("date", "desc")
          .onSnapshot((result) => {
            this.chatContent.splice(0, this.chatContent.length);
            result.forEach((doc) => {
              var changedDate = doc.data();
              changedDate.date = changedDate.date.toDate().toLocaleString();
              this.chatContent.unshift(changedDate);
            });
          });
        console.log("good");
        success("good");
      });

      try {
        var result = await getDB;
        console.log("currentchatuid: " + this.currentChatUid);
        console.log("fetch message done");
        this.ScrollToBottom();
        console.log(result);
      } catch {
        console.log("promise wrong");
      }

      // db.collection("messages")
      //   .where("parentUid", "==", this.currentChatUid)
      //   .orderBy("date", "desc")
      //   .onSnapshot((result) => {
      //     this.chatContent.splice(0, this.chatContent.length);
      //     result.forEach((doc) => {
      //       console.log(doc.data());
      //       console.log(doc.data().date);
      //       var changedDate = doc.data();
      //       changedDate.date = changedDate.date.toDate().toLocaleString();
      //       this.chatContent.unshift(changedDate);
      //     });
      //   });

      // console.log("currentchatuid: " + this.currentChatUid);
      // console.log("fetch message done");
      // this.ScrollToBottom();
    },

    FetchChatRoom() {
      var setCurrentChatUidAsLastestChatUid = 0;
      this.currentChatUid = "0";
      console.log("temporay set curretn chat  uid 0")

      db.collection("chatroom")
        .where("whoUid", "array-contains", this.$store.state.myUserData.uid)
        .orderBy("lastDate", "desc")
        .onSnapshot((querySnapshot) => {
          //reset chatroom
          this.chatRoom.splice(0, this.chatRoom.length);

          //get chatroom drom db
          querySnapshot.forEach((doc) => {
            var addUidAndChangedDate = doc.data();
            addUidAndChangedDate.uid = doc.id;
            addUidAndChangedDate.lastDate = addUidAndChangedDate.lastDate
              .toDate()
              .toLocaleString();

            this.chatRoom.push(addUidAndChangedDate);
            this.ScrollToBottom();

            // set CurrentChatUid as LastestChatUid from db
            if (setCurrentChatUidAsLastestChatUid == 0) {
              this.currentChatUid = addUidAndChangedDate.uid;
              console.log(this.currentChatUid)
              this.FetchMeesages(this.currentChatUid);
              
            }
            setCurrentChatUidAsLastestChatUid += 1;
          });
          console.log("fetch chatroom done");
        });
    },

    checkChatOponent(payload) {
      if (payload.who[0] == this.$store.state.myUserData.userName) {
        this.chatOponent = payload.who[1];
      } else if (payload.who[1] == this.$store.state.myUserData.userName) {
        this.chatOponent = payload.who[0];
      } else {
        this.chatOponent = "???";
      }
      if (payload.whoUid[0] == this.$store.state.myUserData.uid) {
        this.chatOponentUid = payload.whoUid[1];
      } else if (payload.whoUid[1] == this.$store.state.myUserData.uid) {
        this.chatOponentUid = payload.whoUid[0];
      }
    },
  },
  watch: {
    chatContent() {
      this.ScrollToBottom();
      console.log("watching");
    },
    chatRoom() {},
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
.chat-list-box:hover {
  cursor: pointer;
  background-color: rgb(183, 221, 238);
  transition: 0.2s;
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
.chat-date {
  float: left;
}
.minedate {
  float: right;
}

.chatroom-time {
  font-size: 8px;
}

.down-button:hover{
  cursor: pointer;
}
</style>