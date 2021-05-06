import { ref } from 'vue'
import axios from 'axios'

export const createClient = () => {
    const createError = ref(null)
    const createSuccess = ref(null)

    const createClientSend = async (name, poc, email, phone, address, city, state, zip, notes) => {
        try {
            let res = await axios.post(process.env.VUE_APP_CLIENTS_URI, {
                name: name,
                poc: poc,
                pocEmail: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                notes: notes
        
            })

        } catch (err) {
            if (err.response) {
                createError.value = err.response
            }
        }
    }

    return { createClientSend, createError, createSuccess }
}

export const updateClient = () => {

    const updateError = ref(null)
    const updateSuccess = ref(null)

    const updateClientSend = async (id, name, poc, email, phone, address, city, state, zip, notes) => {
        try {
            let res = await axios.put(process.env.VUE_APP_CLIENTS_URI + `/${id}`, {
                name: name,
                poc: poc,
                pocEmail: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                notes: notes
        
            })
        } catch (err) {
            if (err.response) {
                updateError.value = err.response
            }
        }
    }
    return { updateClientSend, updateError, updateSuccess}
}