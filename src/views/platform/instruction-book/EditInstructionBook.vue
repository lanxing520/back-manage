<template>
  <div class="edit-instruction-book">
    <div class="top-right">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" plain @click="switchMode">
        {{ mode === 'edit' ? '预览' : '编辑' }}
      </el-button>
    </div>
    <div class="title">
      <span v-if="mode !== 'edit'">{{ top.title }}</span>
      <el-input v-else v-model="top.title" placeholder="请输入标题" />
    </div>
    <p class="content-text">{{ top.val }}</p>

    <div class="chapter-item" v-for="(chapter, i) in chapterList" :key="i">
      <div class="name-wrapper">
        <span class="chapter-index">{{ i + 1 }}</span>
        <span v-if="mode !== 'edit'">{{ chapter.name }}</span>
        <el-input v-else v-model="chapter.name" placeholder="请输入章节名称" />
        <img v-if="i > 0" src="@img/platform/delete_icon.png" @click="deleteChapter(i)" />
      </div>
      <div class="chapter-content">
        <span v-if="mode !== 'edit'">{{ chapter.content }}</span>
        <el-input v-else v-model="chapter.content" placeholder="请输入模块概要内容" />
      </div>
      <div class="step-item" v-for="(step, i2) in chapter.stepList" :key="i2">
        <div class="step-name">
          <div class="point"></div>
          <span v-if="mode !== 'edit'">{{ step.name }}</span>
          <el-input v-else v-model="step.name" placeholder="请输入步骤名称" />
        </div>
        <div>
          <span v-if="mode !== 'edit'">{{ step.content }}</span>
          <el-input v-else v-model="step.content" placeholder="请输入小节的内容" />
        </div>
      </div>
      <div v-if="mode === 'edit'" @click="addStep(i)" class="add-step">
        <img src="@img/platform/plus_icon.png" alt="" />
        <span>添加步骤</span>
      </div>
    </div>
    <div v-if="mode === 'edit'" class="flex-center">
      <el-button type="primary" @click="addChapter">+添加章节</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash'

const mode = ref('edit')
const switchMode = () => {
  mode.value = mode.value === 'edit' ? 'preview' : 'edit'
}

const top = ref({
  title: '',
  val: '进入“实训简介”，了解实训目的、实训原理、实训内容及攒作步酸，实训要求等。如果有不清楚的地方，可以查闻相关文献或联系在线服好教师进行咨询，做好充分的实训准备，以保证实训效果。在进行实训之前，学生需要自备手肠等參考海料，以便于线下进行工艺参致等数据的计算，部分规范以及参考文献。',
})
const defaultChapterItem = {
  name: '',
  content: '',
  stepList: [
    {
      name: '',
      content: '',
    },
  ],
}
const chapterList = ref([cloneDeep(defaultChapterItem)])
const addStep = (i) => {
  chapterList.value[i].stepList.push({
    name: '',
    content: '',
  })
}
const addChapter = () => {
  chapterList.value.push(cloneDeep(defaultChapterItem))
}
const deleteChapter = (i) => {
  chapterList.value.splice(i, 1)
}

const save = async () => {}
</script>
<style lang="scss" scoped>
.edit-instruction-book {
  position: relative;
  padding: 80px 1rem 1rem 1rem;
  background-color: #fff;
  overflow: auto;

  .top-right {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .title {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    :deep(.el-input) {
      font-size: 1.5rem;
      width: 50%;
      .el-input__inner {
        height: 2.5rem;
      }
    }
  }
  .content-text {
    color: #aeaeae;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  .chapter-item {
    margin-bottom: 1rem;
    .name-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 0.5rem;
      .chapter-index {
        display: inline-block;
        border-radius: 0 15px 15px 0;
        background: #cccccc;
        height: 1.2rem;
        width: 2rem;
        text-align: center;
        line-height: 1.2rem;
        color: #fff;
      }
    }
    .chapter-content {
      margin-bottom: 0.5rem;
    }
    .step-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      .step-name {
        display: flex;
        gap: 1rem;
        align-items: center;
        .point {
          width: 1rem;
          height: 1rem;
          background-color: #cccccc;
          border-radius: 50%;
          box-shadow: 0 0 5px #adb8c9;
        }
      }
    }
    .add-step {
      display: flex;
      align-items: center;
      color: #00a0e9;
      gap: 5px;
      cursor: pointer;
    }
  }
}
</style>
