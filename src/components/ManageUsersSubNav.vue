<template>
  <div class="container mt-4 mb-4">
      <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" href="#" @click="handleEditUsersClick">Edit User</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" @click="handleAddUsersClick">Add User</a>

    <!-- <router-link :to="{name: 'UserAdd'}" class="nav-link">Add Uses</router-link> -->
  </li>
</ul>
  </div>
</template>

<script>
export default {
  name: 'ManageUsersSubNav',
  setup(_, { emit }){

    const handleEditUsersClick = () => {
      emit('editUserClicked')
    }
    const handleAddUsersClick = () => {
      emit('addUserClicked')
    }

    return{ handleEditUsersClick, handleAddUsersClick}
  }

}
</script>

<style>

</style>