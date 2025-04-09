<template>
  <section class="content-wrapper">
    <div class="block-one">
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        accept=".jpg, .png, .gif"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件到这儿或者 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">拖拽文件到图片区域上传，支持JPG/PNG/GIF</div>
        </template>
      </el-upload>
      <div class="right-message">
        <div class="msg-title">课程标题：电机技术虚拟仿真实训</div>
        <div>总策划：XXX</div>
        <div>添加链接：请填写课程外部链接地址</div>
      </div>
      <div class="button-group">
        <el-button type="primary" plain>预览课程</el-button>
        <el-button type="primary" plain>模版设置</el-button>
        <el-button type="primary" plain>已通过发布审核</el-button>
      </div>
    </div>

    <div class="block-two">
      <div class="block-title">基本内容</div>
      <div class="line"></div>
      <CustomForm :form-data="formData" :form-fields="dataFields" />
    </div>
    <div class="block-three">
      <div class="block-title">详细内容</div>
      <QuillEditor />
    </div>
  </section>
</template>
<script setup>
import CustomForm from '@/components/element-plus/CustomForm.vue'
import QuillEditor from '@/components/others/editor/QuillEditor.vue'

const dataFields = [
  { label: '所属学校', type: 'input', prop: 'school', placeholder: '请输入学校名' },
  { label: '院系', type: 'input', prop: 'department', placeholder: '请输入院系' },
  { label: '联系人', type: 'input', prop: 'user', placeholder: '请输入联系人' },
  { label: '电话', type: 'input', prop: 'phone', placeholder: '请输入电话' },
  { label: '总学分', type: 'input', prop: 'score', placeholder: '请输入总学分' },
  { label: '总学时', type: 'input', prop: 'period', placeholder: '请输入总学时' },
  { label: '学科分类', type: 'select', prop: 'subjectType', placeholder: '请选择学科分类' },
  { label: '课程代码', type: 'input', prop: 'code', placeholder: '请输入课程代码' },
  { label: '课程类别', type: 'select', prop: 'lessonType', placeholder: '请选择课程类别' },
  {
    label: '开课时间',
    type: 'datetime',
    prop: 'startTime',
    format: 'YYYY-MM-DD HH:mm',
    placeholder: '请选择开课时间',
  },
  {
    label: '课程资源',
    type: 'radio',
    prop: 'courseResources',
    options: [
      { label: '直接使用', value: 'direct' },
      { label: '间接使用', value: 'indirect' },
    ],
  },
]
const formData = reactive({
  school: '',
  department: '',
  user: '',
  phone: '',
  score: '',
  period: '',
  subjectType: '',
  code: '',
  lessonType: '',
  startTime: '',
  courseResources: '',
})
</script>
<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 130px);
  overflow: auto;
  .block-one {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1em;
    width: 100%;
    height: 300px;
    background: #fff;
    padding: 20px;
    :deep(.el-upload) {
      .el-upload-dragger {
        height: 235px;
      }
    }
    .right-message {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      gap: 1em;
      margin-top: 0.5em;
      font-size: 28px;
      font-weight: normal;
      color: #676e7e;
      .msg-title {
        font-size: 32px;

        color: #000;
      }
    }
    .button-group {
      position: absolute;
      display: flex;
      gap: 0.8em;
      right: 20px;
      bottom: 1em;

      :deep(.el-button) {
        height: 43px;
        font-size: 20px;
      }
    }
  }
  .block-title {
    font-size: 24px;
    line-height: 30px;
    border-bottom: 1px solid #aeaeae;
    padding-bottom: 0.3em;
  }
  .block-two {
    position: relative;
    background: #fff;
    margin-top: 1em;
    width: 100%;

    .line {
      position: absolute;
      width: calc(100% - 2em);
      font-size: 24px;
      top: 195px;
      left: 1em;
      // margin: 0.5em 1em;
      border-bottom: 1px solid #aeaeae;
    }

    :deep(.el-form) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin: 0 3em;
      .el-form-item:nth-child(3),
      .el-form-item:nth-child(4) {
        margin-bottom: 40px;
      }
      .el-form-item__label {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
      }
      .el-input,
      .el-input__inner,
      .el-input__wrapper,
      .el-select,
      .el-select__wrapper,
      .el-radio-group,
      .el-radio__label {
        height: 50px;
        font-size: 20px;
        line-height: 50px;
      }

      .el-date-editor.el-input {
        width: 100% !important;
      }
    }
  }
  .block-three {
    position: relative;
    background: #fff;
    margin-top: 1em;
    min-height: 340px;
    width: 100%;
    .rich-text-editor {
      margin: 0 20px;
    }
    :deep(.ql-editor){
      min-height: 195px;
    }
  }
}
:deep(.ML__keyboard) {
  display: block !important;
}
</style>
