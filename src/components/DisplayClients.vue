<template>
    <div v-if="!noResults">
    <div v-for="client in clients" :key="client._id">
    <div v-if="checkIncludes(client)">
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + client._id" aria-expanded="true" aria-controls="collapseOne">
            {{client.name}}
        </button>
        </h2>
    <div :id="'id' + client._id" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="row">
            <div class="col-5">
                <table class="table table-borderless">
                    <thead/>
                    <tbody>
                        <tr>
                            <th scope="row">Main Point of Contact:</th>
                                <td>{{client.poc}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Point of Contact Email:</th>
                                <td>{{client.pocEmail}}</td>
                        </tr>
                         <tr>
                            <th scope="row">Address:</th>
                                <td>{{client.address}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">State:</th>
                                <td>{{client.state}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">City:</th>
                                <td>{{client.city}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Zip:</th>
                                <td>{{client.zip}}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-2"/>
            <div class="col-5">
                <table class="table table-borderless">
                    <thead/>
                    <tbody>
                        <tr>
                            <th scope="row">Contract Number:</th>
                                <td>{{client.phone}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Contract Type:</th>
                                <!-- <td>{{client.CONTRACTTYPE}}</td> -->
                                <td>Commercial</td>
                        </tr>
                         <tr>
                            <th scope="row">Contract Start Date:</th>
                                <!-- <td>{{client.CONTRACTSTARTDATE}}</td> -->
                                <td>{{client.contractstartdate}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Contract End Date:</th>
                                <!-- <td>{{client.CONTRACTENDDATE}}</td> -->
                                <td>{{client.contractstartdate}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Leased Equipment:</th>
                                <!-- <td>{{client.leased ? "Yes" : "No"}}</td> -->
                                <td>{{true ? "Yes" : "No"}}</td>
                            
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
</div>
</div>
<div v-else>
    <h2 class="ms-3 mb-4">No results found for "{{clientSearchInput}}"</h2>
</div>
</template>

<script>
import { ref, watch, computed } from 'vue'

import { useRoute } from 'vue-router'
export default {

    name: "DisplayClients",
    props: ["clients", "clientSearchInput"],
    setup(props){

        const noResults = ref(false)

        const checkIncludes = (client) => {
            if(client.name.toLowerCase().includes(props.clientSearchInput.toLowerCase())){
            return true
            }
        }

        watch(() => {
            let count = 0
            props.clients.forEach(client => {
                if(client.name.toLowerCase().includes(props.clientSearchInput.toLowerCase())){
                    count++
                    noResults.value = false
                }
            })
            if(count === 0){
                noResults.value = true
            }
        })

        return { checkIncludes, noResults }
    }
}
</script>

<style>

</style>