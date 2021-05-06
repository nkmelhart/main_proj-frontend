<template>
  <div class="modal shadow" id="exampleModal" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Error</h5>
        <button @click="handleClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p v-html="formattedError"></p>
      </div>
      <div class="modal-footer">
        <button @click="handleClose" type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    name: "ErrorModal",
    props: ["error"],
    setup(props, { emit }){

        const formattedError = ref(null)
        
        const handleClose = () => {
            emit("modalClose")
        }
        
        onMounted(() => {
            if(props.error){
            formattedError.value = `- ${props.error.data.error.replaceAll(',', '<br/>- ')}`
        }
        })
        

        return { handleClose, formattedError }
    }
}
</script>

<style>

</style>