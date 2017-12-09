<template>
 <!-- <article class="pa3 pa5-ns"> -->
 <article class="ml7-ns">
  <h1 class="f4 bold center-ml mw5 flex mb2">
    <i @click="goBack" class="w-25 fa fa-arrow-left" aria-hidden="true"></i>
    <span class="w-75">{{title}}</span>
    <i @click.stop="deleteNote(note)" class="tr-l fa fa-trash" aria-hidden="true"></i>
  </h1>
  </label>
  <p class="lh-copy measure-wide center-ls  mw5 f6 black-70">
    <textarea id="comment" name="comment" style="min-height: 40vh" v-model='note'
    class="db border-box hover-black w-80 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
  </p>
 </article>
</template>

<script>
let timeoutHandler
export default {
  data: function () {
    return {
      note: '',
      timeoutHandler
    }
  },
  watch: {
    note: function (newNote) {
      this.textUpdated(newNote)
    },
    notes: function () {
      this.notes.forEach((note) => {
        if (note.id === this.noteId) {
          this.note = note.note
        }
      })
    }
  },
  computed: {
    title () {
      return this.note ? this.note.split(/\n/)[0].substring(0, 20) : 'New Note'
    },
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
      this.$router.push(`/folder/${this.folderId}`)
    },
    goBack: function () {
      this.$router.push(`/folder/${this.folderId}`)
    },
    textUpdated: function (note) {
      this.timeoutHandler && clearTimeout(this.timeoutHandler)
      this.note = note || this.note
      this.timeoutHandler = setTimeout(() => {
        this.saveNote()
        this.timeoutHandler = undefined
      }, 1000)// auto-save every 1 seconds
      // }, 1)// auto-save every 1 seconds
    },
    saveNote () {
      console.log('setingNotes', this.note)
      this.$store.dispatch('setNote', {folderId: this.folderId, noteId: this.noteId, note: this.note, title: this.title})
    }
  },
  created: function () {
    window.onbeforeunload = this.saveNote
    window.onpopstate = this.saveNote
    this.$store.dispatch('queryNotes', this.$route.params.folderId)
  }
}
</script>

<style>

</style>
