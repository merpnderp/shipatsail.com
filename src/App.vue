<template>
  <v-app id="app">
    <v-navigation-drawer fixed v-model="drawer" app right>
      <v-list dense>
        <router-link to='/'>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-list-tile @click="test()">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Notes {{drawer ? "true" : "false"}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items right>
          <!-- <router-link to="signin"><v-btn v-if="!user && user !== 'fetching'" flat>Sign In</v-btn></router-link> -->
          <!-- <router-link to="signup"><v-btn v-if="!user && user !== 'fetching'" flat>Register</v-btn></router-link> -->
          <v-btn v-if="!user && user !== 'fetching'" flat @click.stop="route('signin')">Sign In</v-btn>
          <v-btn v-if="!user && user !== 'fetching'" flat @click.stop="route('signup')">Register</v-btn>
          <v-btn v-if="user && user !== 'fetching'" @click.stop="signout" flat>Sign Out</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <nav-holder/>
    <!-- <div class="main">
      <router-view/>
    </div> -->
  </v-app>
</template>

<script>
import NavHolder from './components/NavHolder'
export default {
  name: 'app',
  components: {
    NavHolder
  },
  data: function () {
    return {drawer: true, counter: 0}
  },
  mounted: function () {
    console.log('mounted', this.counter++)
  },
  computed: {
    user () { return this.$store.state.user }
  },
  methods: {
    route (r) {
      this.$router.push(r)
    },
    signout () {
      this.$store.dispatch('signOut')
    }
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
