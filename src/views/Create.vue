<template>
<ErrorModal v-if="errorTriggered" :error="error" @modalClose="errorTriggered = false" />
<!-- <SuccessModal v-if="successTriggered" :success="'Submission successful'" 
@modalClose="successTriggered = false; router.push('/main');" /> -->
  <div class="container">
    <h2 class="mt-4">Create Ticket</h2>
    <hr class="mb-4 mt-2">
      <form @submit.prevent>
        <div class="row form-group">
        <div class="col-5">
          <label for="inputTitle">Ticket Title</label>
          <input type="text" class="form-control mb-3" id="inputTitle" required v-model='title'>
          <label for="selectClient">Client Name</label>
          <select class="form-select mb-3" id="selectClient" v-model="clientSelect" @change="handleClientClick(clientSelect)">
            <option value="defaultClient" selected disabled hidden>Select a client...</option>
            <option 
            v-for="client in clients" 
            :value="client"
            >{{client.name}}
            </option>
          </select>
          <label for="selectStatus">Ticket Status</label>
          <select class="form-select" id="client" v-model="statusSelect">
            <option value="defaultStatus" selected disabled hidden>Select a status...</option>
            <option 
            v-for="status in allStatus" 
            :value="status">
            {{status}}
            </option>
          </select>
        </div>
        <div class="col-2"/>
        <div class="col-5">
          <label for="inputPOC">Point of Contact</label>
          <input v-model="poc" type="text" class="form-control mb-3" id="inputPOC" required>
          <label for="inputPhone">Contact Phone Number</label>
          <input v-model="phone" type="text" class="form-control mb-3" id="inputPhone" required>
          <label for="inputPhone">Assigned To</label>
          <select class="form-select" id="client" v-model="userSelect">
            <option value="defaultUser" selected disabled hidden>Select a user...</option>
            <option v-for="user in users" :value="user">{{user.name}}</option>
          </select>
        </div>
        </div>
        <div class='row'>
          <label for="inputDetails" class="mt-5">Details of Tickets</label>
          <textarea class="form-control mx-2" id="inputDetails" v-model="details"></textarea>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-end mt-3">
            <button class="btn btn-primary me-3" @click="handleSubmit">Submit</button>
            <button class="btn btn-primary" @click="handleCancel">Cancel</button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { allStatus } from '../helpers/useStatus'
import getTickets from '../helpers/getTickets'
import { createTicket } from '../helpers/postTicket'
import ErrorModal from '../components/ErrorModal'
import toast from '../helpers/successToast'
// import SuccessModal from '../components/SuccessModal'

export default {
  name: "Create",
  components: { ErrorModal },
  emit: ['reloadAfterCreate'],
  setup(props, { emit }){

    const router = useRouter()
    const { loadTicketCreateData, ticketCreateData } = getTickets()
    const { createTicketSend, error, successTriggered } = createTicket()
    const errorTriggered = ref(false)
    const clients = ref(null)
    const users = ref(null)
    const clientSelect = ref('defaultClient')
    const poc = ref('')
    const phone = ref('')
    const userSelect = ref('defaultUser')
    const title = ref('')
    const details = ref('')
    const statusSelect = ref('defaultStatus')

    const clearFields = () => {
      title.value = null,
      clientSelect.value = 'defaultClient',
      statusSelect.value = 'defaultStatus',
      poc.value = null,
      phone.value = null,
      userSelect.value = null,
      details.value = null
    }


    onMounted( async () => {
      await loadTicketCreateData()
      clients.value = ticketCreateData.value.clients
      users.value = ticketCreateData.value.users
      console.log(users.value)
    })

    watch(() => {
      if(error.value){
        errorTriggered.value = true
      }
    })

    const handleClientClick = (clientSelect) => {
      poc.value = clientSelect.poc
      phone.value = clientSelect.phone
    }

    const handleSubmit = async () => {
      await createTicketSend(title.value, details.value, poc.value, phone.value, statusSelect.value, clientSelect.value, userSelect.value)
        if(successTriggered.value){
          clearFields()
          toast('Submission Successful')
        }
    }

    const handleCancel = () => {
      router.push('/main')
    }

    return{handleCancel, handleClientClick, handleSubmit, allStatus, clients, users, title, poc, phone, details, clientSelect, statusSelect, userSelect, errorTriggered, successTriggered, error, router, toast}
  }

}
</script>

<style scoped>

label{
  font-weight: bold;
}

input, select{
  width: 300px;
}
textarea{
  height: 250px;
}

</style>