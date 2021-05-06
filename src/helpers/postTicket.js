import { ref } from 'vue'
import axios from 'axios'
import getTickets from '../helpers/getTickets'

export const createTicket = () => {
    
    const { tickets } = getTickets()
    const error = ref(null)
    const successTriggered = ref(false)

    
    const createTicketSend = async (title, description, contactName, contactNumber, status, client) => {
        const newTicketData = {
        title: title.value,
        description: description.value,
        contactName: contactName.value,
        contactNumber: contactNumber.value,
        status: status.value,
        client: client.value._id
    }
    try{
        let res = await axios.post(process.env.VUE_APP_TICKET_CREATE_URI + `/${client.value._id}/tickets`, newTicketData)
        tickets.value.push(newTicketData)
        successTriggered.value = true
    } catch (err) {
        if (err.response) {
            error.value = err.response
        }
    }
        //tickets.value.push(newTicketData)
    }

    return {createTicketSend, error, successTriggered}
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