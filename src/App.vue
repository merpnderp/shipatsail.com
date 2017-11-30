<template>
  <nav class="db dt-l w-100 border-box pa3 ph5-l">
    <a class="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
      <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="shipatsail.com">
    </a>
    <div class="db dtc-l v-mid w-100 w-75-l tc tr-l">

      <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#/" title="How it Works">Home</a>

      <a v-if="!user && user !== 'fetching'" to="signin" 
        class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#/signin" title="Sign In">Sign In</a>
      <a v-if="!user && user !== 'fetching'" to="signup" 
        class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#/signup" title="Register new account">Register</a>
      <a v-if="!user && user !== 'fetching'" @click.stop="signout"
        class="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Sign Out">Sign Out</a>
    </div>
  </nav>
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
