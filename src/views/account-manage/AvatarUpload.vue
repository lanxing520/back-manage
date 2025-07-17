<template>
  <div class="avatar-upload">
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-button type="primary">本地上传</el-button>
      <template #tip>
        <div class="el-upload__tip">支持jpg、jpeg、png、gif格式大小限制2Mb以内</div>
      </template>
    </el-upload>

    <div class="avatar-preview">
      <div class="preview-item">
        <span>120px</span>
        <img :src="imageUrl" class="avatar-large" />
      </div>
      <div class="preview-item">
        <span>40px</span>
        <img :src="imageUrl" class="avatar-small" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadFiles, UploadRawFile, UploadRequestOptions } from 'element-plus'

const imageUrl = ref('')

const beforeUpload = (rawFile: UploadRawFile) => {
  const isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(rawFile.type)
  const isLt2M = rawFile.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }

  return isImage && isLt2M
}

interface UploadResponse {
  code: number
  data: {
    url: string
  }
  message: string
}

const handleSuccess = (response: UploadResponse, uploadFile: UploadFile) => {
  if (response && response.code === 200) {
    imageUrl.value = response.data.url
  } else if (uploadFile.raw) {
    // Fallback to local URL if API response is not as expected
    imageUrl.value = URL.createObjectURL(uploadFile.raw as Blob)
  }
}
</script>

<style scoped lang="scss">
.avatar-upload {
  display: flex;
  gap: 3rem;
  .avatar-uploader {
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
  }

  .avatar-preview {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    .preview-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .avatar-large {
      width: 120px;
      height: 120px;
      border-radius: 6px;
    }

    .avatar-small {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
