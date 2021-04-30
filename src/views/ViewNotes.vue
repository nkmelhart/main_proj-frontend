<template>
    <div class='container'>
      <div>
      <h2 class="mt-4">View Notes for Ticket #{{id}}</h2>
      <p v-if="ticket">Ticket Title: {{ticket.title}}</p>
      <hr>
      <DisplayNotes v-if="notes.length" :notes="notes"/>
      </div>
  </div>
</template>

<script>
import DisplayNotes from '../components/DisplayNotes'
import getNotes from '../helpers/getNotes'

export default {
    name: 'ViewNotes',
    props: ['id'],
    components: { DisplayNotes },
    setup(props){
      const { load, notes, ticket, error } = getNotes(props.id)

      load()
      
      return { notes, ticket, error }
    }

}
</script>

<style>

</style>