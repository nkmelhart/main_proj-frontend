import { ref } from 'vue'
import axios from 'axios'
import getTickets from '../helpers/getTickets'

export const createTicket = () => {
    
    const { tickets } = getTickets()
    const error = ref(null)
    const successTriggered = ref(false)

    
    const createTicketSend = async (title, description, contactName, contactNumber, status, client, user) => {

        const newTicketData = {
            title: title,
            description: description,
            contactName: contactName,
            contactNumber: contactNumber,
            status: status
        }
        try {
            const res = await axios.post(process.env.VUE_APP_TICKET_CREATE_URI + `/${client._id}/tickets`, {
                title: title,
                description: description,
                contactName: contactName,
                contactNumber: contactNumber,
                status: status,
                assignTo: user._id
            })
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
    let res
    
    const changeStatusResStatus = ref(null)
    if (status === "Closed") {
        console.log('here')
        res = await axios.put(process.env.VUE_APP_TICKET_CHANGE_STATUS + '/' + ticketId, {
            status: status,
            active: false
        })
    }
    else {
        res = await axios.put(process.env.VUE_APP_TICKET_CHANGE_STATUS + '/' + ticketId, {
            status: status,
            active: true
        })
    }
    changeStatusResStatus.value = res.status
    return changeStatusResStatus
    
}

export const changeUser = async (user, ticketId) => {

    const error = ref(null)
    try {
        const res = await axios.put(process.env.VUE_APP_TICKET_CHANGE_STATUS + `/${ticketId}`, {
            assignTo: user._id
        })
    } catch (err) {
        error.value = err.message
    }
}