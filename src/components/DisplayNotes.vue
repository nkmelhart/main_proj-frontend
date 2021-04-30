<template>
  <div v-for="note in notes">
    <div class="main-con card container mb-4">
  <div class="card">
    <div class="card-header fw-bold h5">
      Note Submitted at: {{note.createdAt}} by {{note.enteredBy}}
    </div>
    <div class="card-body border-bottom">
      <p class="card-title"></p>
      <p class="card-text">{{note.note}}</p>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'DisplayNotes',
  props: ['notes'],
  setup(props){

  }

}
</script>

<style>

</style>