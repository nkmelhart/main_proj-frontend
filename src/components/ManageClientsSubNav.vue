<template>
  <div class="container mt-4 mb-4">
      <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" href="#" @click="handleEditClientClick">Edit Client</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" @click="handleAddClientClick">Add Client</a>
  </li>
</ul>
  </div>
</template>

<script>
export default {
  name: 'ManageUsersSubNav',
  setup(_, { emit }){

    const handleEditClientClick = () => {
      emit('editClientClicked')
    }
    const handleAddClientClick = () => {
      emit('addClientClicked')
    }

    return{ handleEditClientClick, handleAddClientClick}
  }

}
</script>

<style>

</style>