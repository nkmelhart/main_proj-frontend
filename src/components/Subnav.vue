<template>
  <div class="container mt-4 mb-4">
      <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" href="#" @click="handleActive">All Active</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">High Priority</a>
    <div class="dropdown-menu">
      <div v-for="high in highStatus">
        <button @click="handleStatus(high)" class="dropdown-item" href="#">{{high}}</button>
      </div>
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Normal Priority</a>
    <div class="dropdown-menu">
      <div v-for="normal in normalStatus">
        <button @click="handleStatus(normal)" class="dropdown-item" href="#">{{normal}}</button>
      </div>
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Low Priority</a>
    <div class="dropdown-menu">
      <div v-for="low in lowStatus">
        <button @click="handleStatus(low)" class="dropdown-item" href="#">{{low}}</button>
      </div>
    </div>
  </li>
</ul>
  </div>
</template>

<script>

import { normalStatus, highStatus, lowStatus } from '../helpers/useStatus'
import getTickets from '../helpers/getTickets'

export default {
  name: 'Subnav',
  emits: ['filteredTickets', 'reloadActive'],
  setup(props, context){

    const {loadSelectedTickets, tickets} = getTickets()

    const handleStatus = (statusEntered) => {
      context.emit('filteredTickets', statusEntered)
    }

    const handleActive = () => {
      context.emit('reloadActive')
    }
    return {normalStatus, highStatus, lowStatus, handleStatus, handleActive}
  }
}

</script>

<style>

</style>