import axios from 'axios'
import { ref } from 'vue'

const getNotes = (ticketId) => {
    const notes = ref([])
    const ticket = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let res = await axios.get(process.env.VUE_APP_NOTES_URI + '/' + ticketId + '/notes')

            notes.value = await res.data.data
            ticket.value = await res.data.ticket
            if (notes.value.length === 0) {
                notes.value[0] = 'none'
            }
        } catch (err) {
            error.value = err.message
        }
    }

    return {load, notes, ticket, error}
}

export default getNotes