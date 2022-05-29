
import { createStore } from 'vuex'
import { db } from "./main.js";
import firebase from "firebase/app";
import "firebase/firestore";



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
                userProfileurl: 'https://placeimg.com/500/500/people',
                userContent: 'Hello brothers',
                role: 'normal'
            },

            cardData: [
                {
                    uid: 2,
                    authorName: 'Jeorge',
                    authorUid: "2",
                    content: 'This is content that someone write the opinion who is more smarter and who is more idiot like me',
                    authorProfileUrl: 'https://placeimg.com/500/500/people',
                    uploadImageUrl: 'https://placeimg.com/640/480/nature',
                    likes: 0,
                    date: '22-2-3',
                    liked: false
                },
                {
                    uid: 3,
                    authorName: 'Elaski',
                    authorUid: "3",
                    content: 'I wanna be a good human who can get monney with bitcoin, it means that i dont wanna work anymore',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/500/500/arch',
                    likes: 1,
                    date: '22-2-4',
                    liked: false
                },
                {
                    uid: 4,
                    authorName: 'Kims',
                    authorUid: "4",
                    content: 'Thats not my fault. dont blame me again',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/640/480/tech/grayscale',
                    likes: 0,
                    date: '22-3-1',
                    liked: false
                },
            ],
            cardDataLiked: [
                {
                    postUid: 5,
                    liked: true,
                    didLikeUserUid: 1,
                    date: '',
                },
                {
                    postUid: 3,
                    liked: true,
                    didLikeUserUid: 1,
                    date: '',
                },

            ],

        }
    },
    mutations: {

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

                db.collection('likes').add(likedData)


                //when you cliked like button already
            } else if (payload.liked != false) {
                console.log('like -1')
                targetPost.liked = false
                targetPost.likes -= 1
                db.collection('posts').doc(payload.uid).update("likes", firebase.firestore.FieldValue.increment(-1))

                db.collection('likes').where("postUid", "==", payload.uid).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().didLikeUserUid == state.myUserData.uid) {
                            db.collection('likes').doc(doc.id).delete()
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
                userProfileurl: 'https://placeimg.com/500/500/people',
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
            db.collection('likes').where("didLikeUserUid", "==", state.myUserData.uid).onSnapshot((querySnapshot) => {
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

        }
    },
    actions: {

    }
})

export default store