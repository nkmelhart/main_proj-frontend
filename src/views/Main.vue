<template>
  <div>
    <TestAlert v-if="false" />
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
      <Spinner v-else></Spinner>
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
import DisplayTicket from '../components/DisplayTicket'
import Navbar from '../components/Navbar'
import TestAlert from '../components/TestAlert'
import Spinner from '../components/Spinner'
import getTickets from "../helpers/getTickets"

export default {
  name: 'Main',
  components: {Subnav, DisplayTicket, Navbar, TestAlert, Spinner},
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
