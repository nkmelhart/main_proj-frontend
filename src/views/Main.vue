<template>
  <div>
    <DisplayTicket v-if='tickets.length' :tickets="tickets" @filterTickets="handleFilter" :statusEntered="statusEntered"/>
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
    
    const { load, tickets, error, loadSelectedTickets } = getTickets()

    load()

    const handleFilter = (statusEntered) => {
      loadSelectedTickets(statusEntered)
    }

    return { tickets, error, handleFilter }
  }
}
</script>
