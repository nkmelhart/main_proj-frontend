import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const isAuthenticated = ref(false)
export const user = ref(null)
export const router = useRouter()

export const auth = () => {
    const error = ref(null)
    const baseURI = process.env.VUE_APP_LOGIN_URI
    const isError = ref('false')

    const login = async (email, password) => {
            let res = await axios.post(baseURI, {
                email: email,
                password: password
            })
            if (res.data.success === true) {
                isAuthenticated.value = true

            }
            else {
                res.data.error = error
            }
    }   
    return{ login, error, isError }
}

export default auth