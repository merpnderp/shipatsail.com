<template>
<article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">
    Folders 
    <i @click.stop="addFolder" class="fa fa-plus" title="New Folder" aria-hidden="true"></i>
  </h1>
  <ul class="list pl0 ml0 center mw6 ba b--light-silver br2">
    <template v-for="(folder, index) in folders">
      <li :key="folder.id" class="ph3 pv3 bb b--light-silver">
        <div class="flex">
          <span class="w-80" v-if="folder.id !== editingId" @click.stop="selectFolder(folder)">
            <span>{{folder.name}}</span>
          </span>
          <span class="w-80" v-else>
            <input @keyup.enter.stop="lostFocus(index)" @blur.stop="lostFocus(index)" 
             :ref="'input-'+folder.id" v-model='editingName'/>
          </span>
          <i @click.stop="setEditingId(folder.id)" class="w-10 fa fa-pencil" aria-hidden="true"></i>
          <i @click.stop="removeFolder(folder)" class="w-10 tr-l fa fa-trash" aria-hidden="true"></i>
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
      editingId: '',
      editingName: ''
    }
  },
  computed: {
    folders () { return this.$store.state.folders }
  },
  methods: {
    lostFocus: function (index) {
      this.editingName = this.editingName.replace(/^\s+/, '').replace(/\s+$/, '')
      if (this.editingId && this.editingName && this.editingName !== this.folders[index].name) {
        this.$store.dispatch('updateFolderName', { id: this.editingId, name: this.editingName })
      }
      this.editingId = ''
      this.editingName = ''
    },
    setEditingId: function (id) {
      this.editingId = id
      this.$nextTick(() => {
        console.log('refs', this.$refs, id)
        console.log(this.$refs['input-' + id][0])
        this.$refs['input-' + id][0].focus()
      })
      this.folders.forEach(element => {
        if (element.id === this.editingId) {
          if (element.name !== 'New Folder') {
            this.editingName = element.name
          } else {
            this.editingName = ''
          }
        }
      })
    },
    removeFolder: function (folder) {
      this.$store.dispatch('removeFolder', folder)
    },
    addFolder: function () {
      this.$store.dispatch('addFolder', {name: 'New Folder'})
    },
    selectFolder: function (folder) {
      if (folder.id !== this.editingId) {
        this.$store.dispatch('clearNotes')
        this.$router.push(`/folder/${folder.id}`)
      }
    }
  }
}
</script>

<style>

</style>
