import { ref } from 'vue'
import axios from 'axios'

const getTickets = () => {
    const tickets = ref([])
    const filteredTickets = ref([])
    const ticketsResStatus = ref(null)
    const error = ref(null)
    const errorTCD = ref(null)
    const ticketCreateData = ref({ clients: null, users: null })
    const ticketsSearchResults = ref([])
    const load = async () => {
        try {
            let res = await axios.get(process.env.VUE_APP_TICKETS_URI + '/?sort=-createdAt&active=true')
            ticketsResStatus.value = res.status
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
            ticketsResStatus.value = await res.status
            tickets.value = await res.data.data
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const loadTicketCreateData = async () => {
        try {
            const res = await axios.get(process.env.VUE_APP_TICKET_CREATE_DATA_URI)
            ticketCreateData.value.clients = res.data.clients
            ticketCreateData.value.users = res.data.users
        } catch (err) {
            errorTCD.value = err.message
            console.log(errorTCD.value)
        }
    }

    const loadTicketsSearchTerm = async (term, active) => {
        try {
            term = term.replace(' ', '+')
            const res = await axios.get(process.env.VUE_APP_TICKET_SEARCH_BY_TERM + `/${term}/?active=${active}`)
            console.log(process.env.VUE_APP_TICKET_SEARCH_BY_TERM + `/${term}/?active=${active}`)
            ticketsSearchResults.value = await res.data.data
            console.log(await ticketsSearchResults.value.length)
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const loadTicketById = async (id, active) => {
        try {
            const res = await axios.get(process.env.VUE_APP_TICKET_BY_ID + `/${id}`)
            console.log(process.env.VUE_APP_TICKET_BY_ID + `/${id}`)
            ticketsSearchResults.value = await [res.data.data]
            console.log(ticketsSearchResults.value)
        } catch (err) {
            error.value = err.message
            ticketsSearchResults.value = []
        }
    }

    const loadTicketsByUser = async (userName, active) => {
        try {
            // const res2 = await axios.get(process.env.VUE_APP_SEARCH_USER + `/${userName}`)
            // const userId = res2.data.data[0]._id

            // const res = await axios.get(process.env.VUE_APP_USERS_URI + `/${userId}/?active=${active}`)
            // console.log(process.env.VUE_APP_USERS_URI + `/${userId}/?active=${active}`)
            // ticketsSearchResults.value = [await res.data.data]
            // console.log(ticketsSearchResults.value)
            const res2 = await axios.get(process.env.VUE_APP_SEARCH_USER + `/${userName}`)
            const userId = res2.data.data[0]._id

            const res = await axios.get(process.env.VUE_APP_TICKET_SEARCH_BY_USER + `/${userId}/?active=${active}`)
            console.log(process.env.VUE_APP_TICKET_SEARCH_BY_USER + `/${userId}/?active=${active}`)
            ticketsSearchResults.value = await res.data.data
            console.log(ticketsSearchResults.value)
        } catch (err) {
            error.value = err.message
        }
    }

    const loadTicketsByClient = async (client, active) => {
        try {
            const res = await axios.get(process.env.VUE_APP_TICKET_SEARCH_BY_CLIENT + `/${client}/?active=${active}`)
            ticketsSearchResults.value = await res.data.data
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return {
        load,
        loadSelectedTickets,
        loadTicketCreateData,
        loadTicketsSearchTerm,
        loadTicketById,
        loadTicketsByUser,
        loadTicketsByClient,
        ticketsSearchResults,
        tickets,
        error,
        ticketsResStatus,
        ticketCreateData,
    }
}

export default getTickets