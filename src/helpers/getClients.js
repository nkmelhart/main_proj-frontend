import axios from 'axios'
import { ref } from 'vue'

const getClients = () => {
    const clients = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            let res = await axios.get(process.env.VUE_APP_CLIENTS_URI)
            clients.value = res.data.data
        }
        catch (err) {
            console.log(err)
            console.log('here')
        }
    }
    return { clients, error, load }
}

export default getClients