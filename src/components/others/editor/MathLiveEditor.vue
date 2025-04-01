<template>
  <div class="mathlive-editor-container">
    <!-- 编辑器标题 -->
    <h2 class="editor-title">数学公式编辑器</h2>

    <math-field class="math-field" @input="onInput"> {{ mathValue }} </math-field>

    <!-- LaTeX 代码显示 -->
    <div class="latex-section">
      <h3>LaTeX 代码</h3>
      <textarea v-model="mathValue" @input="updateFromLatex" class="latex-textarea"></textarea>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button @click="save" class="action-button export-button">
        <span class="icon">🖼️</span> 保存
      </button>
      <button @click="resetEditor" class="action-button reset-button">
        <span class="icon">♻️</span> 重置
      </button>
    </div>
  </div>
</template>

<script setup>
import 'mathlive'

const emit = defineEmits(['save'])
const mathValue = ref('')
const onInput = (event) => {
  console.log(event.target.value)

  mathValue.value = event.target.value
}
const save = () => {
  emit('save', mathValue.value)
}
// MathLive 相关引用
// const mathfieldElement = ref(null)
// let mathfield = null

// // 编辑器状态
// const latexValue = ref('\\frac{d}{dx}\\sqrt{x} = \\frac{1}{2\\sqrt{x}}')
// const speechEnabled = ref(false)
// const isSpeaking = ref(false)
// const voices = ref([])
// const selectedVoice = ref(0)

// // 初始化 MathLive 编辑器
// onMounted(async () => {
//   // 创建 MathLive 元素
//   mathfield = new MathfieldElement()
//   mathfield.value = latexValue.value
//   mathfield.setOptions({
//     virtualKeyboardMode: 'manual', // 禁用默认虚拟键盘
//     smartFence: true, // 智能括号
//     smartMode: true, // 自动转换文本为数学模式
//     smartSuperscript: true, // 智能上标
//     scriptDepth: 10, // 允许嵌套深度
//     removeExtraneousParentheses: true, // 移除多余括号

//     // 更多配置选项可以参考 MathLive 文档
//   })

//   // 添加到 DOM
//   mathfieldElement.value.appendChild(mathfield)

//   // 监听内容变化
//   mathfield.addEventListener('input', () => {
//     latexValue.value = mathfield.value
//   })

//   // 初始化语音合成 API
//   await initializeSpeech()
// })

// // 执行工具栏命令
// const executeCommand = (command) => {
//   mathfield.executeCommand(command)
//   mathfield.focus()
// }

// // 从 LaTeX 更新编辑器
// const updateFromLatex = () => {
//   mathfield.value = latexValue.value
// }

// // 重置编辑器
const resetEditor = () => {
  mathValue.value = ''
}
</script>

<style scoped lang="scss">
.mathlive-editor-container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;

  .math-field {
    width: 100%;
    height: 300px;
  }
  .latex-section {
    width: 100%;
    .latex-textarea {
      width: 100%;
      height: 100px;
    }
  }
}

.editor-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.copy-button {
  background-color: #4dabf7;
  color: white;
}

.export-button {
  background-color: #40c057;
  color: white;
}

.reset-button {
  background-color: #fa5252;
  color: white;
}
</style>
