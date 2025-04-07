<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="100px">
      <div class="top-title-wrapper">
        <div class="top-title">章节基本信息</div>
      </div>
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item v-for="(item, i) in speakerFormFields.slice(0, -1)" :key="i" :index="i + ''">
          <span class="flex-center">
            <img
              v-if="hasValue(speakerFormData[item.prop])"
              class="icon_img"
              src="@/assets/img/platform/alert.png"
              alt=""
            />
            <el-icon v-else :size="25"><CircleCheckFilled color="#87d068" /></el-icon>
            <span>
              {{ item.label }}
            </span>
          </span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区域 -->
    <section class="right-wrapper">
      <div>
        <custom-form
          :form-data="speakerFormData"
          :form-fields="speakerFormFields"
          label-width="auto"
          @data-change="onDataChange"
        >
          <template #knowledgePoints="{ props }">
            <div>
              <div
                class="knowledge-points"
                v-for="(item, i) in speakerFormData.knowledgePoints"
                :key="i"
              >
                <el-input v-model="item.value" />
                <span>已绑定({{ item.bind }})</span>
                <img src="@img/platform/edit.png" alt="" />
              </div>
              <el-button @click="addKeywords">+添加关键词</el-button>
            </div>
          </template>
        </custom-form>
        <!-- <Upload class="upload-wrapper" /> -->
      </div>
    </section>
  </el-container>
</template>

<script setup lang="ts">
import CustomForm from '@/components/element-plus/CustomForm.vue'
import Upload from '@/components/element-plus/Upload.vue'
import { typeUtils } from '@/utils/typeUtils'
const activeIndex = ref('0')
const speakerFormData = ref({
  speaker: '',
  introduction: '',
  knowledgePoints: [{ value: '', bind: 0 }],
  teachGuide: [],
  trainGuide: [],
  testPaper: [],
  trainReport: [],
  bindExam: [],
  file: [],
})
const speakerFormFields = [
  { label: '主讲人:', type: 'input', prop: 'speaker' },
  { label: '小节简介:', type: 'textarea', prop: 'introduction', rows: 5 },
  { label: '知识点:', type: 'custom', prop: 'knowledgePoints' },
  { label: '教学指导书:', type: 'input', prop: 'teachGuide' },
  { label: '实训指导书:', type: 'upload', prop: 'trainGuide' },
  { label: '测试卷:', type: 'upload', prop: 'testPaper' },
  { label: '实训报告:', type: 'upload', prop: 'trainReport' },
  { label: '绑定考试:', type: 'upload', prop: 'bindExam' },
  { label: '上传资料:', type: 'custom', prop: 'file' },
]
// 处理菜单选择
const handleMenuSelect = (index) => {
  activeIndex.value = index
}
const hasValue = (val) => {
  const type = typeUtils.getType(val)
  if (type === 'array') {
    return val.length === 0
  } else if (type === 'string') {
    return val === ''
  } else if (type === 'undefined') {
    return false
  }
  return val
}

const onDataChange = (data) => {
  speakerFormData.value = data
}
const addKeywords = () => {
  // speakerFormData.knowledgePoints.push({ value: '', bind: 0 })
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  gap: 0.5em;
  .icon_img {
    width: 21px;
    height: 21px;
    margin-right: 7px;
  }
}
.el-container {
  height: 70vh;
  display: grid;
  grid-template-columns: 180px auto;
}
.top-title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  .top-title {
    font-size: 25px;
  }
}

.el-aside {
  background: #ebf0f7;
  color: #000;
  width: 180px;
}

.el-menu {
  background: none;
  border-right: none;
  .el-menu-item {
    font-size: 20px;
    color: #000;
    &.is-active {
      background: #fff;
    }
    &:hover {
      background: #fff;
    }
  }
}
.right-wrapper {
  position: relative;
  padding-left: 30px;
  padding-top: 20px;
  height: 500px;
  overflow: hidden auto;
}
.knowledge-points {
  display: grid;
  grid-template-columns: auto 5em 1em;
  gap: 1em;
  margin-bottom: 1em;
}
:deep(.el-form) {
  width: 80%;
  margin-top: 5em;
  margin-left: 2em;
  .el-form-item {
    margin-bottom: 1em;
    border-bottom: 1px solid #aeaeae;
    padding-bottom: 2em;
    padding-right: 100px;
    .el-form-item__label-wrap {
      margin-left: 0;
    }
  }
}
// .upload-wrapper {
//   position: absolute;
//   left: 50px;
//   bottom: 40px;
// }
</style>
