<template>
  <div>
      <h4 class="text-center mt-5">Page not found</h4>
      <router-link :to="{ name: 'Landing'}" v-if="checkAuth">Return to login page</router-link>
  </div>
</template>

<script>
    import {isAuthenticated} from '../helpers/useAuth'

    export default {

        name: "NotFound",
        setup() {
            
            const checkAuth = () => {
                return isAuthenticated.value
            }
            return {checkAuth}
        }

    }
</script>

<style>

</style>