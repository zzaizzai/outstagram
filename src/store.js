
import { createStore } from 'vuex'
import { db } from "./main.js";
import firebase from "firebase/app";
import "firebase/firestore";
import router from './router'



const store = createStore({

    state() {
        return {


            updatePostCycle: 0,

            likedPost: {
                uid: 0,
                date: 0,
            },


            myUserData: {
                uid: '0',
                userName: 'admin',
                userEmail: 'parkdesssu@sds.com',
                userProfileurl: 'none',
                userContent: 'none',
                role: 'normal'
            },

            cardData: [

            ],
            cardDataLiked: [

            ],

        }
    },
    mutations: {

        GetUserDataFromStorage(state, payload) {
            console.log(payload)
            state.myUserData.uid = payload.uid
            state.myUserData.userName = payload.userName
            state.myUserData.userEmail = payload.userEmail
            state.myUserData.userContent = payload.userContent
            state.myUserData.userProfileurl = payload.userProfileurl


        },

        // when you click heart button, chagne the db data and my state
        LikeToPost(state, payload) {

            console.log(payload.uid);
            var targetPost = state.cardData.find(v => v.uid === payload.uid)


            //when you clik like button
            if (payload.liked == false) {
                console.log('like +1')
                targetPost.liked = true

                targetPost.likes += 1
                db.collection('posts').doc(payload.uid).update("likes", firebase.firestore.FieldValue.increment(1))


                var likedData = {
                    postUid: payload.uid,
                    liked: true,
                    didLikeUserUid: state.myUserData.uid,
                    date: new Date,
                }

                db.collection('likes').add(likedData).then((result) => {
                    console.log(result)
                    console.log("like +1  update done")

                })


                //when you cliked like button already
            } else if (payload.liked != false) {
                console.log('like -1')
                targetPost.liked = false
                targetPost.likes -= 1
                db.collection('posts').doc(payload.uid).update("likes", firebase.firestore.FieldValue.increment(-1))

                db.collection('likes').where("postUid", "==", payload.uid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().didLikeUserUid == state.myUserData.uid) {
                            db.collection('likes').doc(doc.id).delete().then(() => {
                                console.log("like -1  update done")
                            })
                        }
                    })
                })
            }

        }
        ,
        NewUserProfile(state, payload) {
            var data = {
                uid: payload.uid,
                userName: payload.userName,
                userEmail: payload.userEmail,
                userProfileurl: 'https://placeimg.com/500/500/people',
                userContent: 'Hello brothers',
                role: 'normal'
            }
            console(data)
            state.myUserData = data

        },
        SignInUserProfile(state, payload) {
            var data = {
                uid: payload.uid,
                userName: payload.userName,
                userEmail: payload.userEmail,
                userProfileurl: payload.userProfileurl,
                userContent: payload.userContent,
                role: 'normal'
            }
            console.log(data)
            state.myUserData = data
            console.log(state.myUserDatate)
            console.log('done')

        },

        //get data from db when show post page
        FetchLikes(state) {
            state.cardDataLiked.splice(0, state.cardDataLiked.length)
            db.collection('likes').where("didLikeUserUid", "==", state.myUserData.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    state.cardDataLiked.unshift(doc.data())
                    var PostLikeTurnToTrue = state.cardData.find(v => v.uid === doc.data().postUid)
                    if (PostLikeTurnToTrue) {
                        PostLikeTurnToTrue.liked = true
                        console.log('turned true')
                    } else {
                        console.log('did nothing')
                    }

                })
            })

        },
        FetchPosts(state) {
            state.cardData.splice(0, state.cardData.length)
            db.collection("posts").orderBy("date").get().then((querySnapshot) => {
                querySnapshot.forEach((post) => {
                    var addUidandNormalDate = post.data();
                    addUidandNormalDate.uid = post.id;
                    addUidandNormalDate.date = addUidandNormalDate.date.toDate().toLocaleString();
                    state.cardData.unshift(addUidandNormalDate);

                });
            });


        },

        CheckChatRoomAndCreateChatRoom(state, payload) {
            var isChatRoomExist = false;
            console.log(payload);

            db.collection("chatroom")
                .where("whoUid", "array-contains", state.myUserData.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log("already chatroom exist");
                        console.log(doc.data());
                        if (
                            doc.data().whoUid.includes(state.myUserData.uid) &&
                            doc.data().whoUid.includes(payload.authorUid)
                        ) {
                            isChatRoomExist = true;
                        }
                    });
                    console.log(isChatRoomExist);
                    if (isChatRoomExist) {
                        router.push("/chat");
                    } else {
                        this.commit('CreateChatRoom ', payload);
                        console.log("create new chat romm")

                        var chatData;
                        chatData = {
                            uid: "",
                            whoUid: [state.myUserData.uid, payload.authorUid],
                            who: [state.myUserData.userName, payload.authorName],
                            startDate: new Date(),
                            lastDate: new Date(),
                        };
                        console.log(chatData);
                        console.log(payload);
                        db.collection("chatroom")
                            .add(chatData)
                            .then((querySnapshot) => {
                                console.log(querySnapshot);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        router.push("/chat");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    actions: {

    }
})

export default store