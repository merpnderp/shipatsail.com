<template>
 <!-- <article class="pa3 pa5-ns"> -->
 <article class="">
  <h1 class="f4 bold center mw5">
    <span>{{title}}</span>
    <i @click.stop="deleteNote(note)" class="w-10 tr-l fa fa-trash" aria-hidden="true"></i>
  </h1>
  </label>
  <p class="lh-copy measure-wide center-ns  mw5 f6 black-70">
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
      // this.textUpdated(newNote)
    }
  },
  computed: {
    title () {
      console.log(this.note)
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
    },
    textUpdated: function (note) {
      note = note || this.note
      console.log('updated')
      alert('hi')
      // this.timeoutHandler && clearTimeout(this.timeoutHandler)
      // this.timeoutHandler = setTimeout(() => {
      //   this.$store.dispatch('setNote', note)
      //   this.timeoutHandler = undefined
      // }, 10000)
    },
    pageLeaveEvent: function () {
      alert('trying to elave')
      return 1
    }
  },
  created: function () {
    console.log('adding handlers')
    window.onbeforeunload = this.pageLeaveEvent
    window.onpopstate = this.pageLeaveEvent
    // window.onblur = this.pageLeaveEvent
    // window.onmouseout = this.pageLeaveEvent
  }

}
</script>

<style>

</style>
