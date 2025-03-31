<template>
  <div class="video-upload-container">
    <!-- 上传区域 -->
    <el-upload
      class="video-uploader"
      action="#"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleFileChange"
      :before-upload="beforeUpload"
      accept="video/*"
      drag
    >
      <div v-if="1 || videoUrl" class="video-preview">
        <video ref="videoPlayer" controls :src="videoUrl" class="video-element"></video>
      </div>
    </el-upload>
    <div class="video-actions">
      <el-button type="primary" :icon="Upload" plain @click="handleReupload">{{
        !videoUrl ? '本地上传' : '重新上传'
      }}</el-button>

      <el-button type="danger" plain @click="remove">X移除</el-button>
    </div>
    <!-- 上传信息 -->
    <div class="upload-info" v-if="currentFile">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="文件名">{{ currentFile.name }}</el-descriptions-item>
        <el-descriptions-item label="文件大小">{{
          formatFileSize(currentFile.size)
        }}</el-descriptions-item>
        <el-descriptions-item label="文件类型">{{ currentFile.type }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 上传进度 -->
    <!-- <el-progress
      v-if="uploading"
      :percentage="uploadProgress"
      :status="uploadStatus"
      :stroke-width="12"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'

// 定义Props
const props = defineProps({
  // 初始视频URL（用于编辑模式）
  initialVideoUrl: {
    type: String,
    default: '',
  },
  // 允许的最大文件大小（MB）
  maxSize: {
    type: Number,
    default: 50,
  },
  // 允许的视频类型
  acceptTypes: {
    type: Array as () => string[],
    default: () => ['video/mp4', 'video/webm', 'video/ogg'],
  },
})

// 定义Emits
const emit = defineEmits(['upload-success', 'upload-error', 'file-change'])

// 响应式数据
const videoUrl = ref('')
const currentFile = ref<File | null>(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref<'success' | 'exception' | ''>('')
const isUploaded = ref(false)
const videoPlayer = ref<HTMLVideoElement | null>(null)

// 初始化（如果有初始视频URL）
if (props.initialVideoUrl) {
  videoUrl.value = props.initialVideoUrl

  isUploaded.value = true
}
const remove = () => {
  currentFile.value = null
}
// 处理文件选择变化
const handleFileChange = (file: UploadFile, fileList: UploadFiles) => {
  if (fileList.length > 1) {
    fileList.splice(0, 1)
  }

  const rawFile = file.raw as File
  currentFile.value = rawFile

  // 创建预览URL
  videoUrl.value = URL.createObjectURL(rawFile)
  isUploaded.value = false

  emit('file-change', rawFile)
}

// 上传前验证
const beforeUpload = (rawFile: UploadRawFile) => {
  // 检查文件类型
  if (props.acceptTypes.length > 0 && !props.acceptTypes.includes(rawFile.type)) {
    ElMessage.error(`只支持 ${props.acceptTypes.join(', ')} 格式的视频`)
    return false
  }

  // 检查文件大小
  const isLtMaxSize = rawFile.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    ElMessage.error(`视频大小不能超过 ${props.maxSize}MB!`)
    return false
  }

  return true
}

// 处理上传
const handleUpload = () => {
  if (!currentFile.value) return

  uploading.value = true
  uploadProgress.value = 0
  uploadStatus.value = ''

  // 模拟上传过程（实际项目中替换为真实API调用）
  const interval = setInterval(() => {
    uploadProgress.value += Math.floor(Math.random() * 10) + 5
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      uploading.value = false
      uploadStatus.value = 'success'
      isUploaded.value = true

      // 实际项目中这里应该是API返回的视频URL
      // videoUrl.value = response.data.url

      ElMessage.success('视频上传成功')
      emit('upload-success', {
        file: currentFile.value,
        url: videoUrl.value, // 实际项目中替换为服务器返回的URL
      })
    }
  }, 300)
}

// 重新上传
const handleReupload = () => {
  if (videoUrl.value && videoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(videoUrl.value)
  }

  videoUrl.value = ''
  currentFile.value = null
  isUploaded.value = false
  uploadProgress.value = 0
  uploadStatus.value = ''
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 清理对象URL
const revokeObjectURL = () => {
  if (videoUrl.value && videoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(videoUrl.value)
  }
}

// 组件卸载时清理
onUnmounted(() => {
  revokeObjectURL()
})

// 暴露方法给父组件
defineExpose({
  getVideoFile: () => currentFile.value,
  getVideoUrl: () => videoUrl.value,
  clear: () => {
    handleReupload()
    revokeObjectURL()
  },
})
</script>

<style scoped lang="scss">
.video-upload-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: #fff;

  height: 200px;
  .video-uploader {
    /* height: 150px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
    .video-preview {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .video-element {
        display: block;
        height: 250px;
        width: 100%;
        max-height: 400px;
        background-color: #000;
        // border: 1px dashed #aeaeae;
        border-radius: 4px;
      }
    }
  }
}

.video-actions {
  display: flex;
  gap: 10px;
}

.upload-info {
  margin: 20px 0;
}

:deep(.el-upload) {
  width: 100%;
  .el-upload-dragger {
    padding: 0;
    height: 250px;
  }
}

:deep(.el-descriptions__body) {
  background-color: #f5f7fa;
}
</style>
