<template>
  <div>
    <ManageUsersSubNav @addUserClicked="modifySelectedTab('Add')" @editUserClicked="modifySelectedTab('Edit')" />
    <UsersForm :selectedTab="selectedTab" />
  </div>
</template>

<script>

import { ref } from 'vue'
import ManageUsersSubNav from '../components/ManageUsersSubNav'
import UsersForm from '../components/UserForm'

export default {
  name: 'ManagerUsers',
  components: { ManageUsersSubNav, UsersForm },
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