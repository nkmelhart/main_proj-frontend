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
            <div class="mb-auto">
            <h5 class="card-title border-bottom pb-2">{{ticket.title}}</h5>
            <p class="card-text mt-3">{{ticket.description}}</p>
            <i class="mt-2">- Submitted on {{convertDate((ticket.createdAt).toString())}}</i>
            </div>
              <div class="btn-toolbar mt-3 d-flex">
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
                 <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle me-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Assign To
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li v-for="user in users" @click="handleChangeUser(user, ticket._id)" :key="user"><a class="dropdown-item" href="#">{{user.name}}</a></li>
                  </ul>
                </div>
                <i class="mt-3 ms-auto">Assigned to: {{ticket.assignTo.name}}</i>
              </div>
          </div>
          <div class="col-4 border-start mt-n1">
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
                  <th scope="row">Contact Number:</th>
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

import Subnav from '../components/Subnav'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allStatus } from '../helpers/useStatus'
import { changeStatus, changeUser } from '../helpers/postTicket'
import convertDate from '../helpers/convertDate'
import getUsers from '../helpers/getUsers'

export default{
  name: 'DisplayTickets',
  props: ['tickets', 'statusEntered'],
  emits: ['filterTickets', 'statusChanged'],
  components: {Subnav},
  setup(props, {emit}){

    const router = useRouter()

    const { load, users, error } = getUsers()

    onMounted(() => {
      load()
      console.log('here')
    })

    const checkPath = () => {
      if (router.currentRoute.value.fullPath === '/searchtickets'){
        console.log('true')
        return true
      }
    }

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
      ticket.status = status
      for( var i = 0; i < props.tickets.length; i++){
        if(props.tickets[i].status === 'Closed'){
          props.tickets.splice(i, 1)
        }
      }
      emit('statusChanged')
    }

    const handleChangeUser = async (user, ticketId) => {
        const res = await changeUser(user, ticketId)
         for( var i = 0; i < props.tickets.length; i++){
        if(props.tickets[i]._id === ticketId){
          props.tickets[i].assignTo.name = user.name
        }}
    }

    const handleCloseClick = () => {

    }

    return { isInClosed, statusButton, statuses, allStatus, handleChangeStatus, convertDate, checkPath, users, handleChangeUser }
  }
}

</script>

<style>

div .container{
    border: none;
}

.mt-n1 {
  margin-top: -0.5rem !important;
}

</style>