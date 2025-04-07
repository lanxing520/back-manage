<template>
  <div class="add-paper">
    <BlockWrapper title="新建试卷">
      <CustomForm :form-data="paperData" :form-fields="paperFields" />
      <div class="save-wrapper">
        <el-button class="save" type="primary">保存</el-button>
      </div>

      <div class="bottom-title">试题</div>
      <div class="select-question">
        <span>组卷方式:</span>
        <el-radio-group v-model="way">
          <el-radio value="手动">手动</el-radio>
          <el-radio value="随机">随机</el-radio>
        </el-radio-group>
      </div>
    </BlockWrapper>
  </div>
</template>
<script setup>
import BlockWrapper from '../../components/BlockWrapper.vue'
import CustomForm from '@/components/element-plus/CustomForm.vue'

const paperData = ref({
  name: '',
  difficulty: '',
  category: '',
  passScore: '',
  remark: '',
})
const paperFields = ref([
  {
    label: '名称',
    type: 'input',
    prop: 'name',
  },
  {
    label: '名称',
    type: 'select',
    prop: 'difficulty',
    options: [{ label: 'x', value: 'x' }],
  },
  {
    label: '名称',
    type: 'select',
    prop: 'category',
    options: [{ label: 'x', value: 'x' }],
  },
  {
    label: '名称',
    type: 'input',
    prop: 'passScore',
  },
  {
    label: '名称',
    type: 'textarea',
    prop: 'remark',
    rows: 5,
  },
])
const way = ref('手动')
</script>
<style lang="scss" scoped>
.add-paper {
  :deep(.el-form) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1rem;
    .el-form-item:nth-child(1),
    .el-form-item:nth-child(5) {
      grid-column: span 4;
    }
  }
  .save-wrapper {
    width: 100%;
    .save {
      display: block;
      margin: 0 auto;
    }
  }
  .bottom-title {
    position: relative;
    padding-left: 3rem;
    font-size: 1.5rem;
    &::before {
      content: '';
      width: 2rem;
      height: 1px;
      background: #aeaeae;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after {
      content: '';
      width: calc(100% - 7rem);
      height: 1px;
      background: #aeaeae;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
