<template>
  <v-app id="app">
    <v-navigation-drawer fixed v-model="drawer" app stateless>
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
        <v-list-tile>
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
      <v-toolbar-title @click.stop="route('/')">Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items right>
          <v-btn v-if="!user && user !== 'fetching'" to="signin" flat>Sign In</v-btn>
          <v-btn v-if="!user && user !== 'fetching'" to="signup" flat>Register</v-btn>
          <v-btn v-if="user && user !== 'fetching'" @click.stop="signout" flat>Sign Out</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {
      drawer: false
    }
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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
