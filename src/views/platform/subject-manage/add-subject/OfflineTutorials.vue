<template>
  <section class="content-wrapper">
    <div class="block-one">
      <div class="block-title">
        见面课程

        <span class="right-button">
          <el-button>删除</el-button>
          <el-button> +添加线下课程</el-button>
        </span>
      </div>

      <CustomForm
        :form-data="formData"
        :form-fields="formFields"
        :rules="rules"
        :show-reset="false"
        :show-submit="true"
        submit-text="确定"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import CustomForm from '@/components/element-plus/CustomForm.vue'

const formData = ref({
  theme: '',
  type: '',
  speaker: '',
  teachAssistant: '',
  schedule: '',
  time: '',
  location: '',
  requirements: '',
})
const formFields = ref([
  { label: '课程主题:', prop: 'theme', type: 'input', placeholder: '请输入课程主题' },
  {
    label: '任务类型:',
    prop: 'type',
    type: 'select',
    placeholder: '请选择任务类型',
    options: [{ label: 'xxx', value: 'xx' }],
  },
  { label: '主讲人:', prop: 'speaker', type: 'input', placeholder: '请输入主讲人' },
  { label: '助教:', prop: 'teachAssistant', type: 'input', placeholder: '请输入助教' },
  {
    label: '要求进度:',
    prop: 'schedule',
    type: 'select',
    placeholder: '请选择要求进度',
    options: [{ label: 'xxx', value: 'xx' }],
  },
  {
    label: '上课时间:',
    prop: 'time',
    type: 'datetime',
    placeholder: '请选择上课时间',
    format: 'YYYY-MM-DD HH:mm',
  },
  { label: '上课地址:', prop: 'location', type: 'input', placeholder: '请输入上课地址' },
  {
    label: '教学要求:',
    prop: 'requirements',
    type: 'textarea',
    rows: 13,
    placeholder: '请输入教学要求',
  },
])
const rules = {
  theme: [{ required: true, message: '请输入', trigger: 'blur' }],
  type: [{ required: true, message: '请输入', trigger: 'blur' }],
  speaker: [{ required: true, message: '请输入', trigger: 'blur' }],
  teachAssistant: [{ required: true, message: '请输入', trigger: 'blur' }],
  schedule: [{ required: true, message: '请输入', trigger: 'blur' }],
  time: [{ required: true, message: '请输入', trigger: 'blur' }],
  location: [{ required: true, message: '请输入', trigger: 'blur' }],
  requirements: [{ required: true, message: '请输入', trigger: 'blur' }],
}
</script>
<style lang="scss" scoped>
@use './common-style.scss';
.block-one {
  .block-title {
    position: relative;
    .right-button {
      font-size: 12px;
      position: absolute;
      display: flex;
      align-items: center;
      gap: 1em;
      right: 1em;
      bottom: 1em;
      cursor: pointer;
      .el-button {
        border-radius: 15px;
      }
    }
  }

  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1em;
    gap: 1rem;
    .el-form-item {
      margin-bottom: 40px;
    }
    .el-form-item:nth-child(7),
    .el-form-item:nth-child(8) {
      grid-column: span 2; /* 跨越2列 */
    }
  }
}
</style>
