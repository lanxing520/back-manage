<template>
  <section class="content-wrapper">
    <div>
      <AVueFlow />
    </div>
    <div class="block-one">
      <div class="block-title">
        <span>在线课程</span>
        <button @click="addChapter" class="control-button">+章</button>
        <button class="control-button">指导书</button>
        <button class="control-button">实训报告</button>
      </div>
      <EditCourse ref="editCourse" />
    </div>

    <div class="block-two">
      <div class="block-title">实训项目资料</div>
      <CustomTable
        :data="tableData"
        :columns="columns"
        :showOperation="true"
        :operation-column="operationColumn"
      />
    </div>
    <div class="block-three">
      <div class="block-title">
        添加考试

        <div class="right-button">
          <span>新建考试</span>
          <span>设置权重</span>
        </div>
      </div>
      <EditTest :test="item" v-for="(item, i) in testList" :key="i" />
    </div>
  </section>
</template>
<script setup>
import { useTemplateRef } from 'vue'
import EditCourse from './components/EditCourse.vue'
import CustomTable from '@/components/element-plus/CustomTable.vue'
import EditTest from './components/EditTest.vue'
import AVueFlow from '@/components/others/AVueFlow.vue'

// 表格数据
const tableData = ref([{ id: 1, name: 'asdasda', chapter: 25 }])

// 列配置
const columns = ref([
  { prop: 'name', label: '资料名称' },
  { prop: 'chapter', label: '所属章节' },
])
// 操作列配置
const operationColumn = ref({
  label: '操作',
  width: '200',
  buttons: [
    {
      label: '查看',
      type: 'primary',
      size: 'small',
      onClick: (row) => handleView(row),
    },
  ],
})
const testList = reactive([
  {
    type: '期中',

    paperName: '',
    rate: 33,
  },
  {
    type: '期末',

    paperName: '',
    rate: 33,
  },
  { type: '其他', name: '', paperName: '', rate: 34 },
])
const editCourseRef = useTemplateRef('editCourse')
const addChapter = () => {
  editCourseRef.value.addChapter()
}
</script>
<style lang="scss" scoped>
@use './common-style.scss';

.block-title {
  display: grid;
  grid-template-columns: 150px auto 120px 100px;
}
.control-button {
  width: max-content;
  border-radius: 15px;
  padding: 0 20px;
  cursor: pointer;
}
.block-three {
  .block-title {
    position: relative;
    .right-button {
      font-size: 12px;
      position: absolute;
      display: flex;
      gap: 2em;
      right: 1em;
      cursor: pointer;
    }
  }
}
</style>
