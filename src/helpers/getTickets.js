import { ref } from 'vue'
import axios from 'axios'

const getTickets = () => {
    const tickets = ref([])
    const filteredTickets = ref([])
    const error = ref(null)
    const load = async () => {
        try {
            let res = await axios.get(process.env.VUE_APP_TICKETS_URI)
            
            tickets.value = await res.data.data
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    filteredTickets.value = tickets.value

    const loadSelectedTickets = async (status) => {
        try {
            let res = await axios.get(process.env.VUE_APP_TICKETS_URI + '/?status=' + status)
            
            tickets.value = await res.data.data
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return {load, loadSelectedTickets, tickets, error}
}

export default getTickets