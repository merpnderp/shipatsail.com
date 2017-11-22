<template>
  <div class="main">
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-tooltip right>
            <v-btn icon large :href="source" target="_blank" slot="activator">
              <v-icon large>code</v-icon>
            </v-btn>
            <span>Source</span>
          </v-tooltip>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      foo: 'bar',
      source: ''
    }
  },
  components: {
  },
  methods: {
    test () {
      console.log('testing')
    }
  }

}
</script>

