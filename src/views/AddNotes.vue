<template>
<ErrorModal v-if="errorTriggered" :error="error" @modalClose="errorTriggered = !errorTriggered" />
  <div class='container'>
      <div>
      <h2 class="mt-4">Add Notes for Ticket #{{id}}</h2>
      <p>Ticket Title: This is where the ticket title will go</p>
      <hr>
      </div>
      <div class='row'>
          <label for="inputDetails" class="mt-3">Notes</label>
          <textarea v-model="newNote" class="form-control mx-2" id="inputDetails"></textarea>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-end mt-3">
            <button @click="handleSubmit" class="btn btn-primary me-3">Submit</button>
            <router-link :to="{ name: 'Main'}" class="btn btn-primary">Cancel</router-link>
          </div>
        </div>
  </div>
</template>

<script>

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ErrorModal from '../components/ErrorModal'

export default {
    name: 'AddNotes',
    props: ['id'],
    components: {ErrorModal},
    setup(props) {

      const newNote = ref('')
      const router = useRouter()
      const errorTriggered = ref(false)
      const error = ref(null)

      watch(() => {
        if(error.value){
          errorTriggered.value = true
        }
      })

      const handleSubmit = async () => {
        try{
          await axios.post(process.env.VUE_APP_NOTE_ADD_URI + '/' + props.id + '/notes', {
            note: newNote.value,
            enteredBy: 'Nolan.. for now',
            ticket: props.id
          })
          router.push(`/viewnotes/${props.id}`)
        } catch(err){
            if(err.response){
              error.value = err.response
            }
        }
      }
      return { handleSubmit, newNote, error, errorTriggered }
  }
}

</script>

<style scoped>

label{
  font-weight: bold;
}
textarea{
  height: 250px;
}

</style>