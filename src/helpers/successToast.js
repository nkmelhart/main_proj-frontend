import { createToast } from 'mosha-vue-toastify'
import '../../node_modules/mosha-vue-toastify/dist/style.css'

const toast = (message) => {
      createToast(message, {
        type: 'success',
        position: 'bottom-right',
        hideProgressBar: true
      })
}

export default toast