<template>
  <div>
    <Navbar/>
    <Subnav/>
    <DisplayTicket/>
    <DisplayTicket/>
    <DisplayTicket/>
  </div>
</template>

<script>
import {onMounted} from 'vue'
import {isAuthenticated} from '../helpers/useAuth'
import Subnav from '../components/Subnav'
import Subnav2 from '../components/SubNav2'
import DisplayTicket from '../components/DisplayTicket'
import Navbar from '../components/Navbar'

export default {
  name: 'Main',
  components: {Subnav, Subnav2, DisplayTicket, Navbar},
  setup(){
      
    }
}
</script>
