<template>
 <article class="">
  <h1 class="f4 bold center mw6">
    <i @click="goBack" class="w-25 fa fa-arrow-left" aria-hidden="true"></i>
    <span class="w-75">{{title}}</span>
    <i @click.stop="deleteNote(note)" class="tr-l fa fa-trash" aria-hidden="true"></i>
    <i @click.stop="showPasswordModal" class="fa fa-lock" aria-hidden="true"></i>
  </h1>
  <p class="lh-copy measure-wide center mw6 pl3 f6 black-70">
    <textarea id="comment" name="comment" style="min-height: 30vh" v-model='note'
    class="db border-box hover-black w-80 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
  </p>
  <password-modal ref="passwordModal"></password-modal>
 </article>
</template>

<script>
import PasswordModal from './PasswordModal'
let timeoutHandler
export default {
  components: {
    PasswordModal
  },
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
      this.notes[this.folderId] && this.notes[this.folderId].forEach((note) => {
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
    saveNote () {
      this.$store.dispatch('setNote', {folderId: this.folderId, noteId: this.noteId, note: this.note, title: this.title})
    },
    showPasswordModal () {
      this.$refs.passwordModal.open()
    },
    textUpdated: function (note) {
      this.timeoutHandler && clearTimeout(this.timeoutHandler)
      this.note = note || this.note
      this.timeoutHandler = setTimeout(() => {
        this.saveNote()
        this.timeoutHandler = undefined
      }, 500)// auto-save every 1/2 second
    }
  },
  created: function () {
    this.$store.dispatch('queryNotes', this.$route.params.folderId)
    this.notes[this.folderId] && this.notes[this.folderId].forEach((note) => {
      if (note.id === this.noteId) {
        this.note = note.note
      }
    })
  }
}
</script>

<style>

</style>
