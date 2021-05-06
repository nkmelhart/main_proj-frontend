<template>
  <div class='container'>
      <div>
        <h2 class="mt-4">Ticket Search</h2>
        <hr>
          <div class="row mb-3 mt-4">
            <div class="col-2">
            <select class="form-select" id="selectActive" v-model='activeSelect'>
              <option value="activeTickets">
                Active
              </option>
              <option value="closedTickets">
                Closed
              </option>
            </select>
          </div>
            <div class="col-10">
            <div class="input-group">
              <input v-model="searchTerm" type="text" class="form-control" aria-label="Text input with dropdown button">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Search by...</button>
            <ul class="dropdown-menu">
              <li><button @click="handleSearchTerm" class="dropdown-item">Term</button></li>
              <li><button @click="handleSearchTicketId" class="dropdown-item">Ticket Number</button></li>
              <li><button @click="handleSearchUser" class="dropdown-item">User Assigned</button></li>
              <li><button @click="handleSearchClient" class="dropdown-item">Client</button></li>
            </ul>
          </div>
          </div>
          
          </div>
      </div>
      <div>
        <h2 class="ms-3 mb-4" v-if="ticketsSearchResults.length && !isSearchTicketId">{{ticketsSearchResults.length}} results for "{{searchTermStatic}}"</h2>
        <div v-else>
          <h2 class="ms-3 mb-4" v-if="clicked" >No results for "{{searchTermStatic}}"</h2>
        </div>
        <h2 class="ms-3 mb-4" v-if="ticketsSearchResults.length && isSearchTicketId">Ticket: "{{searchTermStatic}}"</h2>
        <DisplayTicket v-if='ticketsSearchResults.length || ticketsSearchResults !== null' :tickets="ticketsSearchResults" />
      </div>
  </div>
</template>

<script>
import DisplayTicket from '../components/DisplayTicket'
import getTickets from '../helpers/getTickets'
import { ref } from 'vue'
export default {
  name: 'SearchTickets',
  components: {DisplayTicket},
  setup(){
    const { loadTicketsSearchTerm, ticketsSearchResults, loadTicketById, loadTicketsByUser, loadTicketsByClient } = getTickets()
    const searchTerm = ref('')
    const searchTermStatic = ref('')
    const isSearchTicketId = ref(false)
    const activeSelect = ref('activeTickets')
    const clicked = ref(false)
    

    const boolActive = (isActive) => {
      console.log(isActive.value)
      if(isActive.value === "activeTickets"){
        console.log("true")
        return true
      }
      else{
        console.log("false")
        return false
      }
    }

    const handleSearchTerm = async () => {
      await loadTicketsSearchTerm(searchTerm.value, boolActive(activeSelect))
      searchTermStatic.value = searchTerm.value
      clicked.value = true
    }

    const handleSearchTicketId = async () => {
      await loadTicketById(searchTerm.value, boolActive(activeSelect))
      searchTermStatic.value = searchTerm.value
      isSearchTicketId.value = true
      console.log(ticketsSearchResults.value)
      clicked.value = true
    } 

    const handleSearchUser = async() => {
      await loadTicketsByUser(searchTerm.value, boolActive(activeSelect))
      searchTermStatic.value = searchTerm.value
      clicked.value = true
    }

    const handleSearchClient = async () => {
      await loadTicketsByClient(searchTerm.value, boolActive(activeSelect))
      searchTermStatic.value = searchTerm.value
      clicked.value = true
    }

    return{ searchTerm, handleSearchTerm, ticketsSearchResults, handleSearchTicketId, searchTermStatic, isSearchTicketId, handleSearchUser, activeSelect, handleSearchClient, clicked }
  }
}
</script>

<style>


</style>