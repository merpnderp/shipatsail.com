<template>
  <div class="fl-page">

    <nav class="db dt-l w-100 border-box pa3 ph5-l">
    <!-- <nav class="db dt-l center border-box pa3 ph5-l"> -->
      <a class="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
        <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="shipatsail.com">
      </a>
      <div class="db dtc-l v-mid w-100 w-75-l tc tr-l">
        <router-link class="link dim dark-gray f6 f5-l dib mr3 mr4-l" to="/" title="Home">Home</router-link>
        <router-link v-if="userState !== 'LOGGEDIN'" to="signin" 
          class="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Sign In">Sign In</router-link>
        <router-link v-if="userState !== 'LOGGEDIN'" to="/signup" 
          class="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Register new account">Register</router-link>
        <router-link v-if="userState === 'LOGGEDIN'" to="/signout"
          class="link dim dark-gray f6 f5-l dib mr3 mr4-l" title="Sign Out">Sign Out</router-link>
      </div>
    </nav>
    <div class="pa1-ns pb5-ns ph3 pb3">
      <router-view></router-view>
    </div>

    <main-footer></main-footer>

  </div>
</template>

<script>
import MainFooter from '@/components/Footer'
export default {
  name: 'app',
  components: {
    MainFooter
  },
  data: function () {
    return {
      drawer: false
    }
  },
  computed: {
    userState () { return this.$store.state.users.userState }
  },
  methods: {
    route (r) {
      this.$router.push(r)
    }
  }
}
</script>

<style>
.disabled-link {
  pointer-events: none;
}
.fl-page {
  position: relative;
  min-height: 100vh;
  padding-bottom: 60px; /* Should be equal to the height of your footer */
}
.fl-page-footer-wrap {
  width: 100%;
  position: absolute;
  bottom: 0px;
}

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
