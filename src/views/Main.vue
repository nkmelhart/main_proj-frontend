<template>
  <div>
    <Subnav v-if="isAuthenticated"
    @filteredTickets="handleFilter" :statusEntered="statusEntered" 
    @reloadActive="load"/>
    <DisplayTicket 
    v-if='tickets.length && isAuthenticated' 
    :tickets="tickets" />
    <div v-else class="container">
      <div v-if="ticketsResStatus === 200">
        <p>No Tickets</p>
      </div>
      <div v-if="ticketsResStatus !== 200 && ticketsResStatus !== null">
        <p>Server error: {{ticketsResStatus}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {isAuthenticated} from '../helpers/useAuth'
import Subnav from '../components/Subnav'
//import Subnav2 from '../components/SubNav2'
import DisplayTicket from '../components/DisplayTicket'
import Navbar from '../components/Navbar'
import getTickets from "../helpers/getTickets"

export default {
  name: 'Main',
  components: {Subnav, /*Subnav2,*/ DisplayTicket, Navbar},
  props: ['statusEntered'],
  setup(){
    
    const { load, tickets, error, loadSelectedTickets, ticketsResStatus } = getTickets()

    load()
    const handleFilter = (statusEntered) => {
      loadSelectedTickets(statusEntered)
    }

    return { tickets, error, handleFilter, load, ticketsResStatus, isAuthenticated }
  }
}
</script>
