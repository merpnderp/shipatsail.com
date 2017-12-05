<template>
  <main class="pa4 black-80">
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
        <div class="mv3">
          <label class="db fw6 lh-copy f6" for="password">Password  <span class="normal black-60">(again)</span></label>
          <input v-model="password2" class="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password">
        </div>
        <!-- <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"> Remember me</label> -->
      </fieldset>
      <div class="">
        <input @click.stop="submit" class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Register">
      </div>
      <div class="lh-copy mt3">
        <router-link to="/signin" class="f6 link dim black db">Sign in</router-link>
      </div>
    </form>
  </main>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => (v && v.length) >= 5 || 'Email is required'
    ],
    password: '',
    password2: '',
    passwordHide: true,
    passwordHide2: true,
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length) >= 8 || 'Password must be at least 8 characters'
    ],
    passwordRules2: [
      v => { return v === this.a.data().password || 'Passwords must match' }
    ]
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password
      })
    },
    clear () {
      this.email = ''
      this.password = ''
      this.password2 = ''
    }
  }
}
</script>
<style>

</style>
