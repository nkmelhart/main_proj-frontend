<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
        <div class="text-center mt-5 mb-5"><h1>NovaTickets</h1>  
            <form action="" @submit.prevent>
                <div class="form-group mt-5">
                    <p>Login</p>
                    <input type="text" class="form-control mb-2 ipt" name="email" placeholder="Email" required="required" v-model="email">
                    <input type="password" class="form-control mb-2 ipt" name="password" placeholder="Password" required="required" v-model="password">
                    <button type="submit" @click="handleLogin" class="btn btn-primary btn-lg btn-block login-btn">Submit</button>
                </div>
                <div class="mt-3" v-if="isError"><p>{{loginError}}</p></div>
            </form>
            </div>
        </div>
</template>

<script>
    import { isAuthenticated, auth } from '../helpers/useAuth'
    import {useRouter} from 'vue-router'
    import { ref, onMounted } from 'vue'

    export default {

    setup(){
        
        const router = useRouter()
        const { login, error, isError } = auth()
        const loginError = ref('')
        const email = ref('')
        const password = ref('')
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const handleLogin = async () => {
            
            try{
                await login(email.value, password.value)
                router.push({ name: 'Main'})
            }catch(err){
                isError.value = true
                if(err.message.split(' ').includes("401")){
                    loginError.value = "Unauthorized login"
                }                
            }finally{
                email.value = null
                password.value = null
                await delay(4000)
                isError.value = false
                loginError.value = null
            }
        }

        return { handleLogin, email, password, error, isError, loginError}
    }
}

</script>

<style>

</style>