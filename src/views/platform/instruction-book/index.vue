<template>
  <CommonWrapper class="wrapper" title="指导书管理">
    
      <EditInstructionBook />

   
  </CommonWrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import EditInstructionBook from './EditInstructionBook.vue'
</script>
<style lang="scss" scoped>
.wrapper{
  :deep(.content){
    padding: 1rem;
  }
}

</style>
