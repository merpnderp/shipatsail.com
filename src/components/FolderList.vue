<template>
 <h1>hi</h1> 
</template>

<script>
export default {
  computed: {
    user () { return this.$store.state.user },
    folders () { return this.$store.state.folders }
  }
}
</script>

<style>

</style>
