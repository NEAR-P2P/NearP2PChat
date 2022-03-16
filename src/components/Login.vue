<template>
    <div class="login-container">
        <button @click="loginSumit">Login con usuario anónimo! </button>
    </div>

</template>

<!--Autentifiacion con usuario Anonimo-->
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

<style lang="scss">
  .login-container {
    width: 100%;
    text-align: center;
    padding-top: 50px;

    button {
      width: 50%;
      background-color: #4e37fc;
      color: white;
      font-weight: bold;
      font-size: 18pt;
      padding: 20px;
      border-radius: 15px;
      border: none;
      box-shadow: #00000040 0px 5px 10px;
      cursor: pointer;

      &:hover {
        background-color: #7562ff;
      }
    }
  }
</style>
