# chat_near_dex

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



 ### Rutina para crear la sala del Chat
   
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

### Catptura el url de la imagen
 ```javascript
  computed: {
    messagePhoto() {
      return URL.createObjectURL(this.photo);
    }
  },
  ```
  
 ### Captura de la conversacion en formato json
 
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

### Filtrado de envio y recepcion de mensajes
```javascript
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
      
      },
  ```
 
### Envio de mensaje
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
