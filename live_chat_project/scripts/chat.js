

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.live_chat = db.collection('live_chat');
        this.unsub;
    }
    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        // save the chat document
        const response = await this.live_chat.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.live_chat
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        // update the ui
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateName(username){
        this.useername = username;
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }
}

const chatroom = new Chatroom('general', 'shaun');
// console.log(chatroom);

chatroom.getChats((data)  => {
    console.log(data);
});

//chatroom.updateRoom('gaming');
setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('yoshi');
    chatroom.getChats((data) => {
        console.log(data);
    });
    chatroom.addChat('hello')
}, 3000);