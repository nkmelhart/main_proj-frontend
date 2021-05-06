import axios from 'axios'
import { ref } from 'vue'

const getUsers = () => {
    const users = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            let res = await axios.get(process.env.VUE_APP_USERS_URI)
            users.value = res.data.data
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }  
    }
    
    return { load, users, error }
}

export default getUsers