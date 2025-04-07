<template>
  <div class="course-operation">
    <div class="part-one">
      <img class="left-img" src="" alt="" />
      <div class="right-part">
        <CustomForm
          ref="formRef"
          :form-data="topData"
          label-width="auto"
          :form-fields="formFields"
          :model="model"
        ></CustomForm>
      </div>
      <div class="button-group">
        <el-button v-if="model === 'readOnly'" :icon="Edit" class="edit-button" @click="edit"
          >编辑</el-button
        >
        <div v-else>
          <el-button type="primary" class="edit-button" @click="save">确认</el-button>
          <el-button class="edit-button" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
    <BlockWrapper title="学习人数"></BlockWrapper>
  </div>
</template>
<script setup>
import BlockWrapper from '../components/BlockWrapper.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'
import { Edit } from '@element-plus/icons-vue'
const formRef = useTemplateRef('formRef')
const model = ref('readOnly')
const topData = ref({
  title: '电机技术虚拟仿真',
  hours: '48',
  credit: '3',
  time: '2025-03-03至2026-03-31',
  person: 'XXX',
  phone: '1234567890',
  intro:
    '课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介课程简介',
})

const formFields = [
  { label: '课程标题：', type: 'input', prop: 'title' },
  { label: '学时：', type: 'input', prop: 'hours' },
  { label: '学分：', type: 'input', prop: 'credit' },
  { label: '开课时间：', type: 'input', prop: 'time' },
  { label: '负责人：', type: 'input', prop: 'person' },
  { label: '联系电话：', type: 'textarea', prop: 'phone' },
  { label: '', type: 'textarea', prop: 'intro', rows: 5 },
]

const edit = () => {
  model.value = 'edit'
}
const cancel = () => {
  formRef.value.resetForm()
  model.value = 'readOnly'
}
const save = async () => {
  model.value = 'readOnly'
}
</script>
<style lang="scss" scoped>
.course-operation {
  margin-right: 1rem;
  .part-one {
    display: grid;
    grid-template-columns: 1fr 4fr;
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 1rem;
    gap: 1rem;
    .left-img {
      border: 1px solid #aeaeae;
    }
    .right-part {
      margin-right: 4rem;
      :deep(.el-form) {
        display: grid;
        grid-template-columns: 20rem auto;

        .el-form-item {
          margin-bottom: 5px;
          .el-input {
            width: 250px;
          }

          &:nth-child(1) {
            grid-column: span 2;
            .el-form-item__label,
            .el-form-item__content {
              font-size: 28px;
              font-weight: bold;
            }

            font-size: 30px;
            font-weight: bold;
          }

          &:nth-child(7) {
            grid-column: span 2;
            text-indent: 2em; /* 首行缩进2个字符 */
          }
        }
      }
    }
    .button-group {
      position: absolute;
      right: 2rem;
      top: 1rem;
      .edit-button {
      }
    }
  }
}
</style>
