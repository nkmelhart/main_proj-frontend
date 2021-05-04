import { ref } from 'vue'
import axios from 'axios'
import getTickets from '../helpers/getTickets'

export const createTicket = async (title, description, contactName, contactNumber, status, client) => {
    
    const { tickets } = getTickets()

    const newTicketData = {
        title: title.value,
        description: description.value,
        contactName: contactName.value,
        contactNumber: contactNumber.value,
        status: status.value,
        client: client.value._id
    }

    const res = await axios.post(process.env.VUE_APP_TICKET_CREATE_URI + `/${client.value._id}/tickets`, newTicketData)

    console.log(tickets.value)
    tickets.value.push(newTicketData)
    console.log(tickets.value)

}

export const changeStatus = async (status, ticketId) => {

    const changeStatusResStatus = ref(null)
    console.log(process.env.VUE_APP_TICKET_CHANGE_STATUS + '/' + ticketId)
    const res = await axios.put(process.env.VUE_APP_TICKET_CHANGE_STATUS + '/' + ticketId, {
        status: status
    })
    changeStatusResStatus.value = res.status
    return changeStatusResStatus
    
}