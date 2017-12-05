<template>
 <article class="pa3 pa5-ns">
  <h1 class="f4 bold center mw6">Folder <i @click.stop="addFolder" class="fa fa-plus" title="New Note" aria-hidden="true"></i></h1>
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

}
</script>

<style>

</style>
