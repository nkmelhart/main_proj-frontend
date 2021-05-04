<template>
  <div v-for="status in statuses">
  <div class="main-con card container mb-4">
    <div class="card shadow border border-2">
      <div class="card-header d-flex justify-content-between">
        <div>
          <h4 class="fw-bolder mt-2">{{status}}</h4>
        </div>
      </div>
      <div v-for="ticket in tickets" :key="ticket._id">
      <div v-if="status === ticket.status" class="card-body border-bottom">
        <div class="row">
          <div class="col-8 d-flex flex-column">
            <h5 class="card-title border-bottom pb-2">{{ticket.title}}</h5>
            <p class="card-text mt-2">{{ticket.description}}</p>
              <div class="btn-toolbar mt-auto">
                <router-link :to="{ name: 'ViewNotes', params: { id: ticket._id} }" class="btn btn-primary me-3">View Notes</router-link>
                <router-link :to="{ name: 'AddNotes', params: { id: ticket._id} }"  class="btn btn-primary me-3">Add Notes</router-link>
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle me-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {{statusButton}}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li v-for="status in allStatus" @click="handleChangeStatus(status, ticket._id, ticket, statuses)" :key="status"><a class="dropdown-item" href="#">{{status}}</a></li>
                  </ul>
                </div>
                <a v-if="!isInClosed" href="#" class="btn btn-primary me-3">Close Ticket</a>
              </div>
          </div>
          <div class="col-4 border-start">
            <table class="table ">
              <tbody>
                <tr>
                  <th scope="row">Ticket ID:</th>
                  <td>{{ticket._id}}</td>
                </tr>
                <tr>
                  <th scope="row">Client:</th>
                  <td>{{ticket.client.name}}</td>
                </tr>
                <tr>
                  <th scope="row">Point of Contact:</th>
                  <td>{{ticket.contactName}}</td>
                </tr>
                <tr>
                  <th scope="row">Point of Contact:</th>
                  <td>{{ticket.contactNumber}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { allStatus } from '../helpers/useStatus'
import { ref } from 'vue'
import { changeStatus } from '../helpers/postTicket'
import Subnav from '../components/Subnav'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default{
  name: 'DisplayTickets',
  props: ['tickets', 'statusEntered'],
  emits: ['filterTickets', 'statusChanged'],
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
      const ticketStatusSet = new Set()
      const statusSetOrdered = []
      props.tickets.forEach( el => {
        ticketStatusSet.add(el.status)
      })

      allStatus.value.forEach( el1 => {
        ticketStatusSet.forEach( el2 => {
          if (el1 === el2){
            statusSetOrdered.push(el1)
          }
        })
      })
      return statusSetOrdered
    })

    const handleChangeStatus = async (status, ticketId, ticket, statuses) => {
      const res = await changeStatus(status, ticketId)
      // if(res.value === 200){
      //   console.log('Success: ', res.value)
      // }
      console.log(statuses)
      ticket.status = status
      console.log(statuses)
      emit('statusChanged')
    }

    const handleCloseClick = () => {

    }

    return { isInClosed, statusButton, statuses, allStatus, handleChangeStatus }
  }
}

</script>

<style>

div .container{
    border: none;
}

</style>