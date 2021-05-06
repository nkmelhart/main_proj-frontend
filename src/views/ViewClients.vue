<template>
   <div class='container mb-5'>
      <div>
      <h2 class="mt-4">Client Information</h2>
      <hr>
      <div class="input-group mb-4 mt-4">
        <!-- <button class="btn btn-outline-secondary" type="button" id="searchClients" >Search</button> -->
        <input type="text" class="form-control" placeholder="Enter client name to search..." v-model="clientSearchInput">
      </div>
      </div>
      <div v-if="error">
        <p>Server Error</p>
      </div>
      <div>
        <DisplayClients v-if="clients.length" :clients="clients" :clientSearchInput="clientSearchInput"/>
        <Spinner v-else></Spinner>
      </div>
  </div>
</template>

<script>
import DisplayClients from '../components/DisplayClients'
import getClients from '../helpers/getClients'
import { ref, watch } from 'vue'
import Spinner from '../components/Spinner'

export default {
  name: 'ViewClients',
  components: {DisplayClients, Spinner},
  setup(){
    const clientSearchInput = ref('')

    const {clients, error, load} = getClients()

    load()

    return{clients, error, clientSearchInput}
  }
}
</script>

<style>

</style>