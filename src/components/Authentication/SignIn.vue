<template>
  <main class="pa4 black-80 h-100">
    <form class="measure center">
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="f4 fw6 ph0 mh0">Sign In</legend>
        <div class="mt3">
          <label class="db fw6 lh-copy f6" for="email-address">Email</label>
          <input v-model="email" class="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address">
        </div>
        <div class="mv3">
          <label class="db fw6 lh-copy f6" for="password">Password</label>
          <input v-model="password" class="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password">
        </div>
        <!-- <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"> Remember me</label> -->
      </fieldset>
      <div class="">
        <input v-if="user !== 'validating'" @click.stop="submit" class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Sign in">
        <input v-if="user === 'validating'" class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Signing in...">
      </div>
      <div class="lh-copy mt3" :class="{ 'disabled-link': user === 'validating' }">
        <router-link to="/signup" class="f6 link dim black db">Register</router-link>
        <a href="#0" class="f6 link dim black db">Forgot your password?</a>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    passwordHide: true,
    email: 'kalebmurphy@gmail.com',
    emailRules: [
      v => !!v || 'Email is required',
      v => (v && v.length) >= 5 || 'Email is required'
    ],
    password: 'testtest12398alksdjfAKNfdalksjb/..2341',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length) >= 8 || 'Password must be at least 8 characters'
    ]
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      // if (this.$refs.form.validate()) {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
      // }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
