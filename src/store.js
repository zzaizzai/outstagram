import { createStore } from 'vuex'



const store = createStore({
    
    state() {
        return {


            myUserData: {
                uid: 1,
                userName: 'Park',
                userID: 'parkdesu',
                userProfileurl: 'https://placeimg.com/500/500/people',
                userContent: 'Hello brothers',
            },

            cardData:[
                {
                    uid: 2,
                    authorName: 'Jeorge',
                    content: 'This is content that someone write the opinion who is more smarter and who is more idiot like me',
                    authorProfileUrl: 'https://placeimg.com/500/500/people',
                    uploadImageUrl: 'https://placeimg.com/640/480/nature',
                    likes: 0,
                    date: '22-2-3'
                },
                {
                    uid: 3,
                    authorName: 'Elaski',
                    content: 'I wanna be a good human who can get monney with bitcoin, it means that i dont wanna work anymore',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/500/500/arch',
                    likes: 0,
                    date: '22-2-4'
                },
                {
                    uid: 2,
                    authorName: 'Kims',
                    content: 'Thats not my fault. dont blame me again',
                    authorProfileUrl: 'https://placeimg.com/500/500/arch',
                    uploadImageUrl: 'https://placeimg.com/640/480/tech/grayscale',
                    likes: 0,
                    date: '22-3-1'
                },
            ],
            cardDataliked: [
                {
                    parentUid: 2,
                    liked: true,
                    didLikeUserUid: 1,
                }

            ],

            chatDataList: [
                {
                    uid: 0,
                    whoUid: [1, 2],
                    who: ['Park', 'Kims'],
                    startDate: 22 - 5 - 20,
                    lastDate: 22 - 5 - 30

                },
                {
                    uid: 2,
                    whoUid: [1, 3],
                    who: ['Park', 'Elaski'],
                    startDate: 22 - 5 - 21,
                    lastDate: 22 - 5 - 31,

                }
            ]
            ,
            chatDataContent: [
                {
                    parentUid: 0,
                    senderUid: 1,
                    receiverUid: 2,
                    date: 22 - 5 - 20,
                    content: 'hello!',
                },
                {
                    parentUid: 0,
                    senderUid: 2,
                    receiverUid: 1,
                    date: 22 - 5 - 20,
                    content: 'Whats up!',
                }
            ]

        }
    },
    mutations: {
        likeToPost(state, payload) {
            console.log(payload.uid);
            // var cardData : CardData= cardData(payload.uid)
            // const a = store.cardData ;
            // console.log(a)

        }
    }
})

export default store