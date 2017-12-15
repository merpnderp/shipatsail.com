<template>
 <article class="">
  <h1 class="f4 bold center mw6">
    <router-link to="/"><i class="w-25 fa fa-arrow-left" aria-hidden="true"></i></router-link>
    <span v-if="!editing" @click.stop="setEditingName">
      {{folderName}}
    </span>
    <span v-else>
      <input @keyup.enter.stop="lostFocus" @blur.stop="lostFocus" :ref="'input'" v-model='editingName'/>
    </span>
    <span v-if="!editing">
      <i @click.stop="setEditingName" class="pl3 fa fa-pencil" aria-hidden="true"></i>
      <i @click.stop="addNote" class="pl3 fa fa-plus" title="New Folder" aria-hidden="true"></i>
    </span>
  </h1>
  <ul class="list pl0 ml0 center mw6 ba b--light-silver br2">
    <template v-for="(note, index) in notes">
      <li :key="note.id" class="ph3 pv3 bb b--light-silver" @click.stop="selectNote(note)">
        <div class="flex">
          <span class="w-90">
            <span>{{note.title}}</span>
          </span>
          <i @click.stop="deleteNote(note)" class="w-10 tr-l fa fa-trash" aria-hidden="true"></i>
        </div>
      </li>
    </template>
  </ul>
</article>
</template>

<script>
export default {
  data: function () {
    return {
      editing: false,
      editingName: '',
      currentFolderId: ''
    }
  },
  created: function () {
    this.$store.dispatch('queryNotes', this.$route.params.folderId)
  },
  computed: {
    notes () {
      return this.$store.state.notes[this.folderId]
    },
    folderId () {
      return this.$route.params.folderId
    },
    folderName () {
      let name = ''
      this.folders.forEach((folder) => {
        if (folder.id === this.$route.params.folderId) {
          name = folder.name
        }
      })
      return name
    },
    folders () { return this.$store.state.folders }
  },
  methods: {
    addNote: function () {
      this.$store.dispatch('addNote', this.folderId)
    },
    deleteNote: function (note) {
      this.$store.dispatch('deleteNote', {folderId: this.folderId, noteId: note.id})
    },
    lostFocus: function () {
      this.editingName = this.editingName.replace(/^\s+/, '').replace(/\s+$/, '')
      if (this.editingName) {
        this.$store.dispatch('updateFolderName', { id: this.$route.params.folderId, name: this.editingName })
      }
      this.editing = false
    },
    selectNote: function (note) {
      this.$router.push(`/folder/${this.folderId}/note/${note.id}`)
    },
    setEditingName: function () {
      this.editing = !this.editing
      this.editingName = this.folderName
      if (this.editing) {
        this.$nextTick(() => {
          this.$refs['input'].focus()
        })
      }
    }
  }

}
</script>

<style>

</style>
