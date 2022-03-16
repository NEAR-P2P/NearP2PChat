

<!--Llamado al Componenete Chat -->

<template>
  <div id="app">
   <Chat v-if="user"></Chat>
  <login v-else></login>
  </div>
</template>

<script>
import Login from './components/Login'
import Chat from './components/Chat'
import firebase from 'firebase/compat/app';

export default {
  data() {
    return {
      user: firebase.auth().currentUser
    }
  },
  name: 'App',
  components: {
     Chat,
     Login,
  }
}

</script> 

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
