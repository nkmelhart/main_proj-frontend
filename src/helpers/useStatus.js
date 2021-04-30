import { ref } from 'vue'

export const statusArray = ref({
    id1: "Open",
    id2: "Contact Customer",
    id3: "Scheduled",
    id4: "Ongoing",
    id5: "Code Red",
    id6: "Code Yellow",
    id7: "Waiting on Parts",
    id8: "Waiting on Customer",
    id9: "Waiting on Vendor",
    id10: "On Hold"
})

export const normalStatus = ref([
    'New', 'Open', 'Contact Customer', 'Scheduled', 'Ongoing'
])

export const highStatus = ref([
    'Code Red', 'Code Yellow'
])

export const lowStatus = ref([
    'Waiting on Parts', 'Waiting on Customers', 'Waiting on Vendors', 'On Hold'
])