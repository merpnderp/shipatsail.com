<template>
  <v-container fluid>
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
  </v-container>
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
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
