<template>
  <Subnav @subNavClick="toMain" :statusEntered="statusEntered"/>
  <div v-for="status in statuses">
  <div class="main-con card container mb-4">
    <div class="card shadow border border-2">
      <div class="card-header fw-bolder h5">
        {{status}}
      </div>
      <div v-for="ticket in tickets" :key="ticket._id">
      <div v-if="status === ticket.status" class="card-body border-bottom">
        <h5 class="card-title">{{ticket.title}}</h5>
        <p class="card-text">{{ticket.description}}</p>
        <div class="btn-toolbar">
          <router-link :to="{ name: 'ViewNotes', params: { id: ticket._id} }" class="btn btn-primary me-3">View Notes</router-link>
          <router-link :to="{ name: 'AddNotes', params: { id: ticket._id} }"  class="btn btn-primary me-3">Add Notes</router-link>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle me-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{statusButton}}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="status in statusArray" :key="status"><a class="dropdown-item" href="#">{{status}}</a></li>
            </ul>
          </div>
          <a v-if="!isInClosed" href="#" class="btn btn-primary me-3">Close Ticket</a>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { statusArray } from '../helpers/useStatus'
import { ref } from 'vue'
import Subnav from '../components/Subnav'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

export default{
  name: 'DisplayTickets',
  props: ['tickets', 'statusEntered'],
  emits: ['filterTickets'],
  components: {Subnav},
  setup(props, {emit}){

    const route = useRoute()

    const isInClosed = computed(() => {
      if(route.name === "ClosedTickets"){
        return true
      }
      return false
    })

    const statusButton = computed(() => {
      if(isInClosed.value){
        return "Re-open Ticket"
      }
      return "Change Status"
    })
    
    const statuses = computed( () => {
      const newSet = new Set()
      props.tickets.forEach( el => {
        newSet.add(el.status)
      })
      return newSet
    })

    const toMain = (statusEntered) => {
      emit('filterTickets', statusEntered)
    }

    console.log(statuses.value)

    return { statusArray, isInClosed, statusButton, statuses, toMain }
  }
}

</script>

<style>

div .container{
    border: none;
}

</style>