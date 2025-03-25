<template>
  <div class="tinymce-editor-wrapper">
    <editor v-model="content" :init="initOptions" />
  </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
const content = ref('')
const initOptions = {
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'media table paste code help wordcount',
  ],
  toolbar:
    'undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | \
          image media | help',
  images_upload_url: 'https://your-image-upload-endpoint.com', // 图片上传地址
  file_picker_types: 'image media', // 允许上传图片和媒体文件
}
</script>
<style scoped>
.tinymce-editor-wrapper {
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
}
</style>
