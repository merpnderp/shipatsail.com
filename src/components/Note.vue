<template>
 <article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">
    <span>{{title}}</span>
    <i @click.stop="deleteNote(note)" class="w-10 tr-l fa fa-trash" aria-hidden="true"></i>
  </h1>
  <p class="lh-copy measure center f6 black-70">
    <textarea id="comment" name="comment" style="min-height: 40vh"
    class="db border-box hover-black w-80 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
  </p>
 </article>
</template>

<script>
export default {
  data: function () {
    return {
      title: ''
    }
  },
  computed: {
    notes () {
      return this.$store.state.notes
    },
    folderId () {
      return this.$route.params.folderId
    },
    noteId () {
      return this.$route.params.noteId
    }
  },
  methods: {
    deleteNote: function () {
      this.$store.dispatch('deleteNote', {folderId: this.folderId, noteId: this.noteId})
    }
  }

}
</script>

<style>

</style>
