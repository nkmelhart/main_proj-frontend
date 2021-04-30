import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Landing from '../views/Landing'
import ClosedTickets from '../views/ClosedTickets.vue'
import Create from '../views/Create.vue'
import ManageClients from '../views/ManageClients.vue'
import ManageUsers from '../views/ManageUsers.vue'
import ViewClients from '../views/ViewClients.vue'
import NotFound from '../views/NotFound'
import SearchTickets from '../views/SearchTickets'
import AddNotes from '../views/AddNotes'
import ViewNotes from '../views/ViewNotes'
import UserEdit from '../views/UserEdit'
import UserAdd from '../views/UserAdd'
import ClientEdit from '../views/ClientEdit'
import ClientAdd from '../views/ClientAdd'
import { isAuthenticated } from '../helpers/useAuth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
     beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/searchtickets',
    name: 'SearchTickets',
    component: SearchTickets,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/closedtickets',
    name: 'ClosedTickets',
    component: ClosedTickets,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/manageclients',
    name: 'ManageClients',
    component: ManageClients,
    children: [
      {
        path: '/manageclients/clientedit',
        name: 'ClientEdit',
        component: ClientEdit,
        beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
      },
      {
        path: '/manageclients/clientadd',
        name: 'ClientAdd',
        component: ClientAdd,
        beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
      }
    ]
  },
  {
    path: '/manageusers',
    name: 'ManageUsers',
    component: ManageUsers,
    children: [
      {
        path: '/manageusers/useradd',
        name: 'UserAdd',
        component: UserAdd,
        beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
      },
      {
        path: '/manageusers/useredit',
        name: 'UserEdit',
        component: UserEdit,
        beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
      }
    ]
  },
  {
    path: '/viewclients',
    name: 'ViewClients',
    component: ViewClients,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/addnotes/:id',
    name: 'AddNotes',
    component: AddNotes,
    props: true,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/viewnotes/:id',
    name: 'ViewNotes',
    component: ViewNotes,
    props: true,
    beforeEnter: (to, from) => {
            if (isAuthenticated.value) return true
            return '/'
        },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
