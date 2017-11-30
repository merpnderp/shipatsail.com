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
        <input @click.stop="submit" class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Sign in">
      </div>
      <div class="lh-copy mt3">
        <router-link to="/signup" class="f6 link dim black db">Register</router-link>
        <a href="#0" class="f6 link dim black db">Forgot your password?</a>
      </div>
    </form>
  </main>
  <!-- <v-container fluid>
    <v-layout row wrap>
      <v-flex offset-sm2 sm7 xs12>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRules"
            :counter="8"
            :append-icon="passwordHide ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passwordHide = !passwordHide)"
            :type="passwordHide ? 'password' : 'text'"
            required
          ></v-text-field>

          <v-btn @click="submit" :disabled="!valid">
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container> -->
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
