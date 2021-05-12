<template>
<ErrorModal v-if="errorUpdateTriggered" :error="updateError" @modalClose="errorUpdateTriggered = false"/>
<ErrorModal v-if="errorRegisterTriggered" :error="registerError" @modalClose="errorRegisterTriggered = false"/>
   <div class="container px-4">
        <div class="d-flex justify-content-between">
            <div class="mb-2">
                <h2>{{selectedTab}} Users</h2>
            </div>
            <div v-if="selectedTab === 'Edit' && users.length">
                <select class="form-select" id="selectUser" v-model="userSelect" @change="handleUserClick(userSelect)">
                <option value="defaultUser" selected disabled hidden>Select a user to edit...</option>
                <option 
                    v-for="user in users"
                    :value="user">
                    {{user.name}}</option>
                </select>
            </div>
        </div>
        <hr class="mt-n1">
        <div v-if="userSelect !== 'defaultUser' || selectedTab === 'Add'">
      <form @submit.prevent class="mt-4">
        <div class="row form-group">
        <div class="col-5">
          <label for="inputUserName">User Name</label>
          <input type="text" class="form-control mb-3" id="inputUserName" required v-model='userName'>
          <label for="inputEmail">Email</label>
          <input type="text" class="form-control mb-3" id="inputEmail" required v-model='email'>
          <div v-if="selectedTab === 'Add'">
          <label for="inputPasswird">Password</label>
          <input type="password" class="form-control mb-3" id="inputPassword" required v-model='password'>
          </div>
        </div>
        <div class="col-2"/>
        <div class="col-5">
            <label for="selectRole">Role</label>
          <select class="form-select mb-3" id="selectRole" v-model="roleSelect">
            <option value="defaultRole" selected disabled hidden>Select a role...</option>
            <!-- <option 
            v-for="status in allStatus" 
            :value="status">
            {{status}}
            </option> -->
            <option value="tech">Technician</option>
            <option value="admin">Admin</option>
          </select>
          <label for="inputPhone">Phone Number</label>
          <input v-model="phone" type="text" class="form-control mb-3" id="inputPhone" required>
        </div>
        </div>
        <div class='row'>
          <label for="inputDetails" class="mt-5">User Notes</label>
          <textarea v-model="userNotes" class="form-control mx-2" id="inputDetails"></textarea>
        </div>
        <div class="row">
          <div class="col d-flex justify-content-end mt-3">
            <div v-if="selectedTab === 'Edit'">
            <button class="btn btn-primary me-3" @click="handleEditClick">Edit</button>
            </div>
            <div v-if="selectedTab === 'Add'">
            <button class="btn btn-primary me-3" @click="handleRegisterClick">Add</button>
            </div>
            <button class="btn btn-primary" @click="handleCancelClick">Cancel</button>
          </div>
        </div>
      </form>
      </div>
    </div>
</template>

<script>

import { ref, watch, computed } from 'vue'
import getUsers from '../helpers/getUsers'
import { registerUser, updateUser } from '../helpers/postUser'
import ErrorModal from '../components/ErrorModal'

export default {
    name: 'UserForm',
    components: {ErrorModal},
    props: ["selectedTab"],
    setup(props, { emit }){
        const { load, users, error } = getUsers()
        const userSelect = ref('defaultUser')
        const userId = ref(null)
        const userName = ref(null)
        const email = ref(null)
        const roleSelect = ref("defaultRole")
        const phone = ref(null)
        const userNotes = ref(null)
        const password = ref(null)
        /*---------------------*/
        const errorUpdateTriggered = ref(false)
        const errorRegisterTriggered = ref(false)
        const { updateUserSend, updateError, updateUserSuccess } = updateUser()
        const { registerUserSend, registerError, registerSuccess } = registerUser()


        load()

        const clearFields = () => {
            userSelect.value = 'defaultUser'
            userName.value = null
            email.value = null
            roleSelect.value = "defaultRole"
            phone.value = null
            userNotes.value = null
            password.value = null
        }

        const handleUserClick = (user) => {
            userName.value = user.name
            email.value = user.email
            roleSelect.value = user.role
            phone.value = user.phone
            password.value = null
            userId.value = user._id
        }

        const handleRegisterClick = async () => {
            await registerUserSend(userName.value, password.value, email.value, roleSelect.value, phone.value, userNotes.value)
            clearFields()
            load()
            emit('emitToast')
        }

        const handleEditClick = async () => {
            await updateUserSend(userId.value, userName.value, email.value, roleSelect.value, phone.value, userNotes.value)
            if(!errorUpdateTriggered.value){
              clearFields()
              load()
              emit('emitToast')
            }
        }

        watch(() => {
            if(props.selectedTab === "Add"){
                clearFields()
            }else{
                userSelect.value = 'defaultUser'
                clearFields()
            }
        })

        watch(() => {
          if (updateError.value){
            errorUpdateTriggered.value = true
          }
        })

        watch(() => {
          if (registerError.value){
            errorRegisterTriggered.value = true
          }
        })

        return { userSelect, users, handleUserClick, userName, password, email, roleSelect, phone, userNotes, handleRegisterClick, handleEditClick, errorUpdateTriggered, errorRegisterTriggered, updateError, registerError}
    }
}
</script>

<style scoped>

.mt-n1 {
    margin: 0.25rem;
}

label{
  font-weight: bold;
}

input, select{
  width: 300px;
}
textarea{
  height: 250px;
}
</style>