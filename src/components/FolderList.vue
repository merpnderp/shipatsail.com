<template>
<article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">Folders</h1>
  {{editingId}}
  <ul class="list pl0 ml0 center mw6 ba b--light-silver br2">
    <template v-for="folder in folders">
      <li v-if="folder.id !== editingId" :key="folder.id" @click="setEditingId(folder.id)" class="ph3 pv3 bb b--light-silver">
        {{folder.name}}
      </li>
      <li v-if="folder.id === editingId" :key="folder.id" class="ph3 pv3 bb b--light-silver">
        <input v-model='editingName'  @blur="lostFocus"/>
      </li>
    </template>
  </ul>
</article>
</template>

<script>
// import {db} from '../api/firebase'
export default {
  data: function () {
    return {
      editingId: '',
      editingName: ''
    }
  },
  computed: {
    folders () { return this.$store.state.folders },
    user () { return this.$store.state.user }
  },
  // watch: { 'this.$store.state.user': 'this.addFolderWatcher' },
  // created () { },
  methods: {
    lostFocus: function () {
      console.log(this.editingId)
    },
    setEditingId: function (id) {
      this.editingId = id
      this.folders.array.forEach(element => {
        if (element.id === this.editingId && element.name !== 'New Folder') {
          this.editingName = element.name
        } else {
          this.editingName = ''
        }
      })
    },
    addFolder: function (folder) {
      // if (this.$store.state.user) {
      // db.collection('users').doc(this.$store.state.user.uid).collection('folders').add({ name: folder })
      // }
      // const foldersColleciton = db.collection('folders')
      // return foldersColleciton.add(folder)
    }
  }
}
</script>

<style>

</style>
