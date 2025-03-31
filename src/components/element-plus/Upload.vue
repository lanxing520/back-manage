<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    class="upload-demo"
    :action="props.action ?? 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15'"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="props?.limit ?? 100"
    :on-exceed="handleExceed"
    :auto-upload="props.autoUpload"
    :accept="props.accept"
  >
    <template #trigger>
      <el-button type="primary" plain> {{ props.triggerText ?? '选择文件' }} </el-button>
    </template>
    <el-button class="ml-3" type="success" plain v-if="!props.autoUpload" @click="submitUpload">
      开始上传
    </el-button>
    <el-button class="m-l" type="danger" plain @click="handleRemove"> 移除 </el-button>
    <template #tip>
      <div class="el-upload__tip">{{ props.tips }}</div>
    </template>
  </el-upload>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile, UploadInstance } from 'element-plus'

const uploadRef = useTemplateRef<UploadInstance>('uploadRef')
const props = defineProps<{
  action?: ''
  tips?: string
  limit?: number
  autoUpload?: boolean
  triggerText?: string
  accept?: string
}>()

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
  fileList.value = []
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  )
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>
<style lang="scss" scoped>
.ml-3 {
  margin-left: 2em;
  background-color: #007130;
  border-color: #007130;
}

.m-l {
  margin-left: 2em;
}
</style>
