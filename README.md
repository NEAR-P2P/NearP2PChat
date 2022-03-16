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
