# Chat_near_dex

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

------------------------
-------------------------
### Firebase Database Connection

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyCEDG7t9UpmiNWsjPyd_rwucL_s2ppexLk",
    authDomain: "chat-near-dex.firebaseapp.com",
    databaseURL: "https://chat-near-dex-default-rtdb.firebaseio.com",
    projectId: "chat-near-dex",
    storageBucket: "chat-near-dex.appspot.com",
    messagingSenderId: "601318580099",
    appId: "1:601318580099:web:ea212ac3d89f8ef24ae0b6"
  };
```
  
### Database initialization
```javascript
firebase.initializeApp(firebaseConfig)
```

### Anonymous authentication with firebase
```javascript
firebase.auth().onAuthStateChanged(() => new Vue({
  render: h => h(App),
}).$mount('#app'))
```

### Export of libraries
```javascript
export const db = firebase.firestore();
export const storage = firebase.storage();
//export const storage = firebase.firestore();
```

### Authentication with anonymous user

```javascript
<script>
import firebase from 'firebase/compat/app'
import { getAuth, signInAnonymously } from "firebase/auth";
export default {
    data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
    }
  },
    methods: {
       loginSumit() {
        const auth = getAuth();
        signInAnonymously(auth)
          .then(() => {

          })
       }, 
    }    

 }
</script>
```

 ### Routine to create the chat room
   
 ```javascript
 const room1Ref = db.collection('room1');
 const snapshot = await room1Ref.where('displayName', '==', "NEAR").get();
 this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
 if (snapshot.empty) {

        const messageInfo = {
        'userUID': this.user.uid,
        'displayName': 'NEAR',
        'text': "ATENCION! NO libere las criptomonedas antes de confirmar si el dinero llegó a su cuenta de pago (balance disponible).",
        'created':0,
      }      
      this.db.collection('room1').add(messageInfo)
      this.db.collection('room1').orderBy('created')
      .onSnapshot(querySnap => {this.messages = querySnap.docs.map(doc => doc.data())})
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
      return;  
}
      this.db.collection('room1').orderBy('created')
      .onSnapshot(querySnap => {this.messages = querySnap.docs.map(doc => doc.data())})
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })

    		  return;
      
  },
```

### Capture the url of the image
 ```javascript
  computed: {
    messagePhoto() {
      return URL.createObjectURL(this.photo);
    }
  },
  ```
  
 ### Capture of the conversation in json format
 
  ```javascript
    async Confirmar() {
      const query = await db
      .collection("room1")
      .where("created", ">",0)
      .orderBy('created')
      .get();

      query.forEach(querySnapshot => 
      console.log(querySnapshot.data()));      
    },   
  ```

### Filtering sending and receiving messages
```javascript
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
      
      },
  ```
 
### Send message
```javascript
    async sendMessage(event) {
       event.preventDefault()

        if (this.photo) {

          const timestamp = Date.now();
          const storageRef=firebase.storage().ref(`${timestamp}${this.photo.name}`).put(this.photo);
              storageRef.on(`state_changed`,
              ()=>{
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                  this.picture =url;
                  //console.log(url)
                  this.Grabar();
                });
              }
              );

        } else {

          const messageInfo = {
          'userUID': this.user.uid,
          'displayName': 'gperez83.near',
          'photoURL': null,
          'text': this.message,
          'created': Date.now(),
          'room': 'room1'
          }
          await this.db.collection('room1').add(messageInfo)
          this.message = ''
          this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })

        }
    },
 ```
 
 ### Record the message
 
 ```javascript
 async Grabar() {      
            const messageInfo = {
            'userUID': this.user.uid,
            'displayName': 'gperez83.near',
            'photoURL': this.picture,
            'text': this.message,
            'created': Date.now(),
            'room': 'room1'
            
          }
          await this.db.collection('room1').add(messageInfo)
          this.message = ''
          this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
          this.photo = null;
   }
```
