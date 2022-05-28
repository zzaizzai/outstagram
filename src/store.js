import { createStore } from 'vuex'



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
                    date: '22-2-3'
                },
                {
                    uid: 3,
                    authorName: 'Elaski',
                    authorUid: "3",
                    content: 'I wanna be a good human who can get monney with bitcoin, it means that i dont wanna work anymore',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/500/500/arch',
                    likes: 1,
                    date: '22-2-4'
                },
                {
                    uid: 2,
                    authorName: 'Kims',
                    authorUid: "4",
                    content: 'Thats not my fault. dont blame me again',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/640/480/tech/grayscale',
                    likes: 0,
                    date: '22-3-1'
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
        LikeToPost(state, payload) {
            console.log(payload.uid);
            var targetPost = state.cardData.find(v => v.uid === payload.uid)
            console.log(targetPost)
            // targetPost.likes += 1
            var checkLiked;
            if (state.cardDataLiked.find(v => v.postUid === payload.uid)) {
                checkLiked = state.cardDataLiked.find(v => v.postUid === payload.uid)
            } else {
                checkLiked = false
            }

            console.log(checkLiked)
            //check alreday liked the post
            if (checkLiked.liked == true) {
                console.log("likes-1")
                targetPost.likes -= 1
                var targetPostIndex = state.cardDataLiked.findIndex(v => v.postUid === payload.uid)
                state.cardDataLiked.splice(targetPostIndex, 1)
                console.log(targetPostIndex)


                //remove the liked state

            } else if (checkLiked == false) {
                console.log('lieks +1')
                targetPost.likes += 1

                var newLikeData = {
                    postUid: targetPost.uid,
                    liked: true,
                    didLikeUserUid: state.myUserData.uid,
                    date: new Date(),
                }
                console.log(newLikeData)
                state.cardDataLiked.unshift(newLikeData)

                //create new like data

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
        ShowPosts() {

        }
    }

})

export default store