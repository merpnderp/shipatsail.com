<template>
<article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">Folders</h1>
  <ul class="list pl0 ml0 center mw6 ba b--light-silver br2">
    <template v-for="(folder, index) in folders">
      <!-- <li v-if="folder.id !== editingId" :key="folder.id" @click="setEditingId(folder.id)" class="ph3 pv3 bb b--light-silver"> -->
      <li v-if="folder.id !== editingId" :key="folder.id" class="ph3 pv3 bb b--light-silver">
        <span @click.stop="setEditingId(folder.id)">{{folder.name}}</span>
      </li>
      <li v-if="folder.id === editingId" :key="folder.id" class="ph3 pv3 bb b--light-silver">
        <input :ref="'input-'+folder.id" v-model='editingName' @keyup.enter="lostFocus" @blur="lostFocus"/>
      </li>
    </template>
  </ul>
</article>
</template>

<script>
import {db, auth} from '../api/firebase'
export default {
  data: function () {
    return {
      editingId: '',
      editingName: ''
    }
  },
  computed: {
    folders () { return this.$store.state.folders },
    userState () { return this.$store.state.userState }
  },
  // created () { },
  methods: {
    lostFocus: function () {
      if (this.editingId && this.editingName) {
        db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(this.editingId).set({name: this.editingName})
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
