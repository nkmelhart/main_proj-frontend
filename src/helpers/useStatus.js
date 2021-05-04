import { ref } from 'vue'

export const highStatus = ref([
    'Code Red', 'Code Yellow'
])

export const normalStatus = ref([
    'New', 'Open', 'Contact Customer', 'Scheduled', 'Ongoing'
])

export const lowStatus = ref([
    'Waiting on Parts', 'Waiting on Customer', 'Waiting on Vendor', 'On Hold'
])

export const allStatus = ref(highStatus.value.concat(normalStatus.value.concat(lowStatus.value)))