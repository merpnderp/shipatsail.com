<template>
 <article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">
    <span v-if="!editing" @click.stop="setEditing">
      {{folderName}} 
    </span>
    <span v-else>
      <input @keyup.enter.stop="lostFocus" @blur.stop="lostFocus" :ref="'input'" v-model='editingName'/>
    </span>
    <i v-if="!editing" @click.stop="setEditing" class="pl3 fa fa-pencil" aria-hidden="true"></i>
  </h1>
  <ul class="list pl0 ml0 center mw6 ba b--light-silver br2">
    <template v-for="(note, index) in notes">
      <li :key="note.id" class="ph3 pv3 bb b--light-silver">
        <div class="flex">
          <span class="w-90" @click.stop="selectNote(note)">
            <span @click.stop="setEditingId(folder.id)">{{folder.name}}</span>
          </span>
          <i @click.stop="removeNote(note)" class="w-10 tr-l fa fa-trash" aria-hidden="true"></i>
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
      notes: []
    }
  },
  created: function () {
    console.log('folder created', this.$route.params)
    // this.folderId = this.$route.params.folderId
    // this.folders.forEach((folder) => {
    //   if (folder.id === this.$route.params.folderId) {
    //     this.folderName = folder.name
    //   }
    // })
  },
  computed: {
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
    lostFocus: function () {
      this.editingName = this.editingName.replace(/^\s+/, '').replace(/\s+$/, '')
      if (this.editingName) {
        this.$store.dispatch('updateFolderName', { id: this.$route.params.folderId, name: this.editingName })
      }
      this.editing = false
    },
    setEditing: function () {
      this.editing = !this.editing
      this.editingName = this.folderName
      if (this.editing) {
        this.$nextTick(() => {
          this.$refs['input'].focus()
        })
      }
    },
    addNote: function () {

    },
    deleteNote: function () {

    }
  }

}
</script>

<style>

</style>
