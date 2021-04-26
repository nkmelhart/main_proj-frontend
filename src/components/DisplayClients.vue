<template>
    <div v-for="client in clients" :key="client.CLIENTID">
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#id' + client.CLIENTID" aria-expanded="true" aria-controls="collapseOne">
        {{client.CLIENTNAME}}
      </button>
    </h2>
    <div :id="'id' + client.CLIENTID" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="row">
            <div class="col-5">
                <table class="table table-borderless">
                    <thead/>
                    <tbody>
                        <tr>
                            <th scope="row">Main Point of Contact:</th>
                                <td>{{client.MAINPOC}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Point of Contact Email:</th>
                                <td>{{client.MAINPOCEMAIL}}</td>
                        </tr>
                         <tr>
                            <th scope="row">Address:</th>
                                <td>{{client.ADDRESS}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">State:</th>
                                <td>{{client.STATE}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">City:</th>
                                <td>{{client.CITY}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Zip:</th>
                                <td>{{client.ZIP}}</td>
                            
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
                                <td>{{client.CONTRACTNUM}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Contract Type:</th>
                                <td>{{client.CONTRACTTYPE}}</td>
                        </tr>
                         <tr>
                            <th scope="row">Contract Start Date:</th>
                                <td>{{client.CONTRACTSTARTDATE}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Contract End Date:</th>
                                <td>{{client.CONTRACTENDDATE}}</td>
                            
                        </tr>
                         <tr>
                            <th scope="row">Leased Equipment:</th>
                                <td>{{client.leased ? "Yes" : "No"}}</td>
                            
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
import { ref, onMounted} from 'vue'

import { useRoute } from 'vue-router'
export default {

    name: "DisplayClients",
    props: ["clients"],
    setup(props){
        const route = useRoute()
        console.log(props.clients)
    }

}
</script>

<style>

</style>