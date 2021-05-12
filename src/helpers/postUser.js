import { ref } from 'vue'
import axios from 'axios'
import getTickets from '../helpers/getTickets'

export const registerUser = () => {

    const registerError = ref(null)
    const registerSuccess = ref(null)
    
    const registerUserSend = async (userName, password, email, role, phone, notes) => {
        const newUserData = {
            name: userName,
            password: password,
            email: email,
            role: role,
            phone: phone,
            notes: notes
        }

        try {
            let res = await axios.post(process.env.VUE_APP_REGISTER_USER_URI, newUserData)
        } catch (err) {
            if (err.response) {
                registerError.value = err.response
            }
        }
    }

    return { registerUserSend, registerError, registerSuccess }
}

export const updateUser = () => {
    const updateError = ref(null)
    const updateSuccess = ref(null)
    const { tickets } = getTickets()

    const updateUserSend = async (userId, userName, email, role, phone, notes) => {
        try {
            const newUserData = {
                name: userName,
                email: email,
                role: role,
                phone: phone,
                notes: notes
            }
            let res = await axios.put(process.env.VUE_APP_USERS_URI + `/${userId}`, newUserData)

            tickets.forEach(el => {
                if (el.assignTo === userName) {
                    
                }
            })

        } catch (err) {
            if (err.response) {
                updateError.value = err.response
            }
        }
    }

    return { updateUserSend, updateSuccess, updateError, }
}