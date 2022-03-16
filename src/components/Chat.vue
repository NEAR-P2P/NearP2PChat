<template>
  <div class="wrapper">

    <header>

      <h1>Chat NEAR DEX!!!</h1>
                        <div v-if="imageData!=null">
                <img class="img.preview" :src="picture">
                <br>
            </div>
    </header>

    <section>


      <main>

        <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
             :class="['message', sentOrReceived(msg.userUID)]">

          <img src: :alt="msg.displayName">
          
          <div
            v-if="msg.photoURL"
            class="message__photo"
            :style="{ 'background-image': `url(${msg.photoURL})` }" 
 
          ></div>          
          <br>

          <p v-if="msg.text">
            {{ msg.text }}
          </p>


        </div>

        <div ref="scrollable"></div>

      </main>

       <form @submit="sendMessage">

        <input v-model="message" type="text" placeholder="Enter your message!">
        
         <div
        v-if="photo"
        @click="photo = null"
        class="photo-preview"
        :style="{ 'background-image': `url(${messagePhoto})` }"
        ></div>
  
<button
            @click="$refs.file.click()"
            :disabled="isLoading"
            type="button"
            class="button"
            :class="{ 'is-loading': isLoading }"
          >
            🌄
          </button>
          <input
            @change="onFileChange"
            ref="file"
            type="file"
            class="inputfile"
            style="display: none !important;"
          />
        <button :disabled="!message" or  type="submit">📩</button>

        
  </form>


    </section>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { db } from '../main'
export default {
  name: 'Upload',
    data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: '',
      messages: [],
      photos:[],
      photo:null,
      uploadValue: 0,
      imageData: null,
    }
  },


  async mounted() {
   // RUTINA PARA CREAR LA SALA DE CHAT
   
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
// Fin Rutina

// Catptura el url de la imagen
  computed: {
    messagePhoto() {
      return URL.createObjectURL(this.photo);
    }
  },

  methods: { 

//  Carga la foto en memoria
    onFileChange(event) {
      this.photo = event.target.files[0];
    },

    
    // Captura de la conversacion en formato json
    async Confirmar() {
      const query = await db
      .collection("room1")
      .where("created", ">",0)
      .orderBy('created')
      .get();

      query.forEach(querySnapshot => 
      console.log(querySnapshot.data()));
       
    },


// Filtrado de envio y recepcion de mensajes
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
      
      },
 
// Envio de mensaje
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

// Grabar el mensaje
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

  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  }

  .wrapper {
    text-align: center;
    max-width: 728px;
    margin: 0 auto;


    header {
      background-color: #181717;
      height: 10vh;
      min-height: 50px;
      color: white;
      position: fixed;
      width: 100%;
      max-width: 728px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
      padding: 10px;
      box-sizing: border-box;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100vh;
      background-color: rgb(40, 37, 53);

      main {
        padding: 10px;
        height: 75vh;
        margin: 10vh 0 10vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 0.25rem;
        }

        &::-webkit-scrollbar-track {
          background: #1e1e24;
        }

        &::-webkit-scrollbar-thumb {
          background: #6649b8;
        }
      }

      form {
        height: 10vh;
        position: fixed;
        bottom: 0;
        background-color: rgb(24, 23, 23);
        width: 100%;
        max-width: 728px;
        display: flex;
        font-size: 1.5rem;

        button {
          width: 20%;
          background-color: rgb(56, 56, 143);
        }

        input {
          line-height: 1.5;
          width: 100%;
          font-size: 1rem;
          background: rgb(58, 58, 58);
          color: white;
          outline: none;
          border: none;
          padding: 0 10px;
        }
      }
    }

    button {
      background-color: #282c34; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      font-size: 2.25rem;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    button, input {
      color: #fff;
      border: none;
    }

    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: white;
      text-align: center;
    }

    .message {
      font-size: 1rem;
      color: rgb(255, 255, 253);
      font-family: "Fira Helvetica Neue";
      display: flex;

      &.received {
        p {
          background: #eee893;
          color: rgb(13, 14, 13);
        }
      }

      &.sent {
        flex-direction: row-reverse;

        p {
          font-size: 1.3rem;
          color: #fff;
          background: #0b93f6;
          align-self: flex-end;
        }
      }
      
      &__photo {
        height: 40vmax;
        background-size: cover;
        background-position: center;
        width: 20rem;
        border: 1px solid;
        border-radius: 1rem;
        cursor: pointer;
      }
  
      p {
        max-width: 500px;
        margin-bottom: 12px;
        line-height: 24px;
        padding: 10px 20px;
        border-radius: 40px;
        position: relative;
        color: #fff;
        text-align: center;
      }
    }

.send {
  background-color: gray;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .photo-preview {
    width: 5rem;
    height: 5rem;
    border: 1px solid;
    background-position: center;
    background-size: cover;
    margin-right: 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }
}

  .photo-preview {
    width: 10rem;
    height: 5rem;
    border: 1px solid;
    background-position: center;
    background-size: cover;
    margin-right: 0rem;
    border-radius: 1rem;
    cursor: pointer;
  }

  }

</style>