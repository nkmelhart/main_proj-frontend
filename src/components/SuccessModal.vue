<template>
  <div class="modal" id="exampleModal" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Success</h5>
        <button @click="handleClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p v-html="successMessage"></p>
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
    name: "SuccessModal",
    props: ["success"],
    setup(props, { emit }){

        const successMessage = ref(null)
        
        const handleClose = () => {
            emit("modalClose")
        }
        
        onMounted(() => {
            if(props.success){
            successMessage.value = props.success
        }
        })
        

        return { handleClose, successMessage }
    }
}
</script>

<style>

</style>