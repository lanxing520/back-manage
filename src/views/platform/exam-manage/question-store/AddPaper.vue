<template>
  <BlockWrapper title="新增试题">
    <div class="add-paper">
      <div class="top-filter">
        <CustomForm :form-data="filterForm" :form-fields="filterFormFields"></CustomForm>
      </div>
      <div class="grid-wrapper">
        <span>题干:</span>
        <QuillEditor />
      </div>
      <div class="m-b">提示:先填写好带答案的完整题干,再将需要填写的部分用下划线标注出来即可。</div>
      <div class="grid-wrapper">
        <span>解析:</span>
        <QuillEditor />
      </div>
    </div>
  </BlockWrapper>
</template>
<script setup>
import CommonWrapper from '../../components/CommonWrapper.vue'
import BlockWrapper from '../../components/BlockWrapper.vue'
import QuillEditor from '@/components/others/editor/QuillEditor.vue'

const filterForm = reactive({ questionType: '', difficulty: '', catergory: '' })
const filterFormFields = [
  { label: '题型:', type: 'select', prop: 'questionType', options: [{ label: '1', value: '1' }] },
  { label: '难易度:', type: 'select', prop: 'difficulty', options: [{ label: '2', value: '2' }] },
  { label: '所属分类:', type: 'select', prop: 'catergory', options: [{ label: '2', value: '2' }] },
]
</script>
<style lang="scss" scoped>
.add-paper {
  .top-filter {
    display: flex;
    gap: 2em;
    :deep(.el-form) {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0 1em;
    }
  }
  .m-b {
    margin-bottom: 1rem;
  }
  .grid-wrapper {
    display: grid;
    grid-template-columns: 4rem auto;
    // height: 300px;
    margin-bottom: 1rem;
    .quill-editor-container {
      :deep(.ql-container) {
        height: 200px;
      }
    }
  }
}
</style>
