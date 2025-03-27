<template>
  <div class="rich-text-editor">
    <!-- <div id="toolbar">
      <select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button class="ql-bold"></button>
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </div> -->
    <!-- 编辑器容器 -->
    <div ref="editorContainer"></div>

    <!-- 图片上传对话框 -->
    <el-dialog
      align-center
      append-to-body
      v-model="imageDialogVisible"
      title="上传图片"
      width="30%"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :headers="uploadHeaders"
        :data="uploadData"
        :on-success="handleImageSuccess"
        :before-upload="beforeImageUpload"
        :show-file-list="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽图片到此处或 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 2MB</div>
        </template>
      </el-upload>
    </el-dialog>

    <!-- 视频上传对话框 -->
    <el-dialog
      align-center
      append-to-body
      v-model="videoDialogVisible"
      title="上传视频"
      width="30%"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :headers="uploadHeaders"
        :data="uploadData"
        :on-success="handleVideoSuccess"
        :before-upload="beforeVideoUpload"
        :show-file-list="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽视频到此处或 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">只能上传 mp4/webm 文件，且不超过 100MB</div>
        </template>
      </el-upload>
    </el-dialog>

    <!-- 音频上传对话框 -->
    <el-dialog
      v-model="audioDialogVisible"
      align-center
      append-to-body
      title="上传附件"
      width="30%"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :headers="uploadHeaders"
        :data="uploadData"
        :on-success="handleAudioSuccess"
        :before-upload="beforeAudioUpload"
        :show-file-list="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件到此处或 <em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { UploadFilled } from '@element-plus/icons-vue'

// 编辑器实例
const quill = ref(null)
const editorContainer = ref(null)

// 对话框状态
const imageDialogVisible = ref(false)
const videoDialogVisible = ref(false)
const audioDialogVisible = ref(false)

// 上传配置
const uploadHeaders = ref({
  Authorization: 'Bearer your-token', // 替换为你的认证token
})

const uploadData = ref({
  type: 'image', // 上传类型，根据不同类型设置
})

// 初始化编辑器
onMounted(() => {
  // 注册自定义图片上传按钮
  const ImageUpload = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // 文字样式
        ['blockquote', 'code-block'], // 引用和代码块
        [{ header: 1 }, { header: 2 }], // 标题
        [{ list: 'ordered' }, { list: 'bullet' }], // 列表
        [{ script: 'sub' }, { script: 'super' }], // 上下标
        [{ indent: '-1' }, { indent: '+1' }], // 缩进
        [{ direction: 'rtl' }], // 文字方向
        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题级别
        [{ color: [] }, { background: [] }], // 颜色
        [{ font: [] }], // 字体
        [{ align: [] }], // 对齐
        ['clean'], // 清除格式
        ['link', 'image', 'video', 'audio', 'formula'], // 链接和媒体
      ],
      handlers: {
        image: () => {
          uploadData.value.type = 'image'
          imageDialogVisible.value = true
        },
        video: () => {
          uploadData.value.type = 'video'
          videoDialogVisible.value = true
        },
        audio: () => {
          uploadData.value.type = 'audio'
          audioDialogVisible.value = true
        },
      },
    },
  }

  // 初始化Quill编辑器
  quill.value = new Quill(editorContainer.value, {
    theme: 'snow',
    modules: ImageUpload,
    // modules: {
    //   toolbar: '#toolbar',
    // },
    placeholder: '请输入内容...',
  })

  // 自定义视频和音频的blot
  const BlockEmbed = Quill.import('blots/block/embed')

  class VideoBlot extends BlockEmbed {
    static create(value) {
      const node = super.create()
      node.setAttribute('src', value.url)
      node.setAttribute('controls', 'controls')
      node.setAttribute('width', value.width || '100%')
      node.setAttribute('height', value.height || 'auto')
      node.setAttribute('style', 'max-width:100%;')
      return node
    }

    static value(node) {
      return {
        url: node.getAttribute('src'),
        width: node.getAttribute('width'),
        height: node.getAttribute('height'),
      }
    }
  }
  VideoBlot.blotName = 'video'
  VideoBlot.tagName = 'video'
  Quill.register(VideoBlot)

  class AudioBlot extends BlockEmbed {
    static create(value) {
      const node = super.create()
      node.setAttribute('src', value.url)
      node.setAttribute('controls', 'controls')
      return node
    }

    static value(node) {
      return {
        url: node.getAttribute('src'),
      }
    }
  }
  AudioBlot.blotName = 'audio'
  AudioBlot.tagName = 'audio'
  Quill.register(AudioBlot)
})

// 上传前校验 - 图片
const beforeImageUpload = (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  // const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片!')
  }
  // if (!isLt2M) {
  //   ElMessage.error('图片大小不能超过 2MB!')
  // }

  return isImage
}

// 上传成功 - 图片
const handleImageSuccess = (response, file) => {
  if (response.code === 200) {
    const range = quill.value.getSelection()
    quill.value.insertEmbed(range.index, 'image', response.data.url)
    quill.value.setSelection(range.index + 1)
    imageDialogVisible.value = false
  } else {
    ElMessage.error(response.message || '图片上传失败')
  }
}

// 上传前校验 - 视频
const beforeVideoUpload = (file) => {
  const isVideo = file.type === 'video/mp4' || file.type === 'video/webm'
  // const isLt10M = file.size / 1024 / 1024 < 100

  if (!isVideo) {
    ElMessage.error('只能上传 MP4/WEBM 格式的视频!')
  }
  // if (!isLt10M) {
  //   ElMessage.error('视频大小不能超过 10MB!')
  // }

  return isVideo
}

// 上传成功 - 视频
const handleVideoSuccess = (response, file) => {
  if (response.code === 200) {
    const range = quill.value.getSelection()
    quill.value.insertEmbed(range.index, 'video', {
      url: response.data.url,
      width: '100%',
      height: 'auto',
    })
    quill.value.setSelection(range.index + 1)
    videoDialogVisible.value = false
  } else {
    ElMessage.error(response.message || '视频上传失败')
  }
}

// 上传前校验 - 音频
const beforeAudioUpload = (file) => {
  // const isLt5M = file.size / 1024 / 1024 < 500

  // if (!isLt5M) {
  //   ElMessage.error('音频大小不能超过 500MB!')
  // }

  return true
}

// 上传成功 - 音频
const handleAudioSuccess = (response, file) => {
  if (response.code === 200) {
    const range = quill.value.getSelection()
    quill.value.insertEmbed(range.index, 'audio', {
      url: response.data.url,
    })
    quill.value.setSelection(range.index + 1)
    audioDialogVisible.value = false
  } else {
    ElMessage.error(response.message || '音频上传失败')
  }
}

// 获取编辑器内容
const getContent = () => {
  return editorContainer.value.querySelector('.ql-editor').innerHTML
}

// 设置编辑器内容
const setContent = (content) => {
  const editor = editorContainer.value.querySelector('.ql-editor')
  if (editor) {
    editor.innerHTML = content
  }
}

// 清理编辑器内容
const clearContent = () => {
  setContent('')
}

// 暴露方法
defineExpose({
  getContent,
  setContent,
  clearContent,
})
</script>

<style scoped>
.rich-text-editor {
  height: 500px;
  margin-bottom: 20px;
}

:deep(.ql-editor) {
  min-height: 300px;
  font-size: 16px;
  line-height: 1.6;
}

:deep(.ql-container) {
  font-family: inherit;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

:deep(.ql-container) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

:deep(video),
:deep(audio) {
  max-width: 100%;
  display: block;
  margin: 10px 0;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px 0;
}
</style>
