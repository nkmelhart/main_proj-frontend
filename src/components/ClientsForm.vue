<template>
<ErrorModal v-if="errorUpdateTriggered" :error="updateError" @modalClose="errorUpdateTriggered = false"/>
<ErrorModal v-if="errorCreateTriggered" :error="createError" @modalClose="errorCreateTriggered = false"/>
   <div class="container px-4">
        <div class="d-flex justify-content-between">
            <div>
                <h2>{{selectedTab}} Client</h2>
            </div>
            <div v-if="selectedTab === 'Edit' && clients.length">
                <select class="form-select" id="selectUser" v-model="clientSelect" @change="handleClientClick(clientSelect)">
                <option value="defaultClient" selected disabled hidden>Select a client to edit...</option>
                <option 
                    v-for="client in clients"
                    :value="client">
                    {{client.name}}</option>
                </select>
            </div>
        </div>
        <hr class="mt-n1">
        <div v-if="clientSelect !== 'defaultClient' || selectedTab === 'Add'">
      <form @submit.prevent class="mt-4">
        <div class="row form-group">
        <div class="col-5">
          <label for="inputClientName">Client Name</label>
          <input type="text" class="form-control mb-3" id="inputClientName" required v-model='clientName'>
          <label for="inputClientPoc">Point of Contact</label>
          <input type="text" class="form-control mb-3" id="inputClientPoc" required v-model='clientPoc'>
          <label for="inputPocEmail">Point of Contact Email</label>
          <input type="text" class="form-control mb-3" id="inputPocEmail" required v-model='pocEmail'>
          <label for="inputPasswird">Phone Number</label>
          <input type="text" class="form-control mb-3" id="inputPhone" required v-model='phone'>
        </div>
        <div class="col-2"/>
        <div class="col-5">
        <label for="inputAddress">Street Address</label>
        <input type="text" class="form-control mb-3" id="inputAddress" required v-model='address'>
        <label for="inputCity">City</label>
        <input type="text" class="form-control mb-3" id="inputCity" required v-model='city'>
        <label for="inputState">State</label>
        <input type="text" class="form-control mb-3" id="inputState" required v-model='state'>
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control mb-3" id="inputZip" required v-model='zip'>
        </div>
        </div>
        <div class='row'>
          <label for="inputClientNotes" class="mt-5">Client Notes</label>
          <textarea v-model="clientNotes" class="form-control mx-2" id="inputClientNotes"></textarea>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-end mt-3">
            <div v-if="selectedTab === 'Edit'">
            <button class="btn btn-primary me-3" @click="handleEditClick">Edit</button>
            </div>
            <div v-if="selectedTab === 'Add'">
            <button class="btn btn-primary me-3" @click="handleAddClick">Add</button>
            </div>
            <button class="btn btn-primary" @click="handleCancelClick">Cancel</button>
          </div>
        </div>
      </form>
      </div>
      </div>
</template>

<script>

import { ref, watch } from 'vue'
import getClients from '../helpers/getClients'
import { createClient, updateClient } from '../helpers/postClient'
import ErrorModal from '../components/ErrorModal'

export default {
    name: 'ClientForm',
    components: {ErrorModal},
    props: ["selectedTab"],
    setup(props, { emit }){
        const { load, clients, error } = getClients()
        const clientSelect = ref('defaultClient')
        const clientId = ref(null)
        const clientName = ref(null)
        const clientPoc = ref(null)
        const pocEmail = ref(null)
        const phone = ref(null)
        const address = ref(null)
        const city = ref(null)
        const state = ref(null)
        const zip = ref(null)
        const clientNotes = ref(null)
        /*---------------------------*/
        const {createClientSend, createError, createSuccess} = createClient()
        const {updateClientSend, updateError, updateSuccess} = updateClient()
        const errorUpdateTriggered = ref(false)
        const errorCreateTriggered = ref(false)


        load()

        const clearFields = () => {
            clientSelect.value = 'defaultClient'
            clientName.value = null
            clientPoc.value = null
            pocEmail.value = null
            phone.value = null
            address.value = null
            city.value = null
            state.value = null
            zip.value = null
            clientNotes.value = null
        }

        const handleClientClick = (client) => {
            clientName.value = client.name
            clientPoc.value = client.poc
            pocEmail.value = client.pocEmail
            phone.value = client.phone
            address.value = client.address
            city.value = client.city
            state.value = client.state
            zip.value = client.zip
            clientNotes.value = client.notes
            clientId.value = client._id
        }

        const handleAddClick = async () => {
            await createClientSend(clientName.value, clientPoc.value, pocEmail.value, phone.value, address.value, city.value, state.value, zip.value, clientNotes.value)
            if(!errorCreateTriggered.value){
              clearFields()
              load()
              emit('emitToast')
            }
        }

        const handleEditClick = async () => {
            await updateClientSend(clientId.value, clientName.value, clientPoc.value, pocEmail.value, phone.value, address.value, city.value, state.value, zip.value, clientNotes.value)
            if(!errorUpdateTriggered.value){
              clearFields()
              load()
              emit('emitToast')
            }
        }

        watch(() => {
            if(props.selectedTab === "Add"){
                clearFields()
            }else{
                clientSelect.value = 'defaultClient'
                clearFields()
            }
        })

        watch(() => {
          if(createError.value){
            errorCreateTriggered.value = true
          }
        })

        watch(() => {
          if(updateError.value){
            errorUpdateTriggered.value = true
          }
        })

        return { clientSelect, clients, clientName, clientPoc, pocEmail, phone, address, city, state, zip, clientNotes, handleClientClick, handleAddClick, handleEditClick, errorUpdateTriggered, errorCreateTriggered, createError, updateError}
    }
}
</script>

<style scoped>

.mt-n1 {
    margin: 0.25rem;
}

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