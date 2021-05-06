<template>
  <div>
    <ManageClientsSubNav @addClientClicked="modifySelectedTab('Add')" @editClientClicked="modifySelectedTab('Edit')" />
    <ClientsForm :selectedTab="selectedTab" />
  </div>
</template>

<script>

import { ref } from 'vue'
import ManageClientsSubNav from '../components/ManageClientsSubNav'
import ClientsForm from '../components/ClientsForm.vue'

export default {
  name: 'ManagerUsers',
  components: { ManageClientsSubNav, ClientsForm },
  setup(){
    const selectedTab = ref('Edit')

    const modifySelectedTab = (term) => {
      selectedTab.value = term
    }

    return { selectedTab, modifySelectedTab }
  }
}
</script>

<style>

</style>