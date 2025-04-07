<template>
  <section class="content-wrapper online-tutorials">
    <div v-if="0">
      <AVueFlow />
    </div>
    <div class="block-one">
      <div class="online-block-title block-title">
        <span>在线课程</span>
        <el-button @click="addChapter" class="control-button">+章</el-button>
        <el-button class="control-button">指导书</el-button>
        <el-button class="control-button">实训报告</el-button>
      </div>
      <EditCourse ref="editCourse" @edit-section="openEdit" />
    </div>

    <div class="block-two">
      <div class="online-block-title block-title">实训项目资料</div>
      <CustomTable
        :data="tableData"
        :columns="columns"
        :showOperation="true"
        :operation-column="operationColumn"
      />
    </div>
    <div class="block-three">
      <div class="online-block-title block-title">
        添加考试

        <div class="right-button">
          <span>新建考试</span>
          <span>设置权重</span>
        </div>
      </div>
      <EditTest :test="item" v-for="(item, i) in testList" :key="i" />
    </div>
  </section>
  <el-dialog
    class="chapter-info-dialog"
    align-center
    v-model="dialogVisible"
    :show-close="false"
    width="1300"
  >
    <ChapterInfo />
    <div class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { useTemplateRef } from 'vue'
import EditCourse from './components/EditCourse.vue'
import CustomTable from '@/components/element-plus/CustomTable.vue'
import EditTest from './components/EditTest.vue'
import AVueFlow from '@/components/others/vue-flow/AVueFlow.vue'
import ChapterInfo from './components/ChapterInfo.vue'

// 表格数据
const tableData = ref([{ id: 1, name: 'asdasda', chapter: 25 }])
const dialogVisible = ref(false)
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
const openEdit = (section) => {
  dialogVisible.value = true
}
</script>
<style lang="scss">
@use './common-style.scss';

.online-block-title {
  display: grid;
  grid-template-columns: 150px auto 120px 100px;
}
.control-button {
  width: max-content;
  border-radius: 15px;
  padding: 0 20px;
  border: 1px solid #aeaeae;
  color: #aeaeae;
  background-color: transparent;
  cursor: pointer;
}
.block-three {
  .online-block-title {
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

.chapter-info-dialog {
  position: relative;
  padding: 0 !important;
  .el-dialog__header {
    padding-bottom: 0;
  }
  .dialog-footer {
    position: absolute;
    right: 50px;
    bottom: 60px;
  }
}
</style>
