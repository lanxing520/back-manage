<template>
  <div class="train-list">
    <div class="top">
      <div>学期:</div>
      <el-select v-model="activeTerm" placeholder="请选择" size="large">
        <el-option v-for="item in termList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <el-button>导出数据</el-button>
    </div>

    <div class="content">
      <el-collapse v-model="activeTerm" @change="handleChange">
        <el-collapse-item v-for="(item, i) in list" :title="item.title" :name="item.title">
          <CustomTable :data="item.data" :columns="columns">
            <template #analysis>
              <div>查看详情</div>
              <div>实训成绩</div>
            </template>
          </CustomTable>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script setup>
import CustomTable from '@/components/element-plus/CustomTable.vue'

const termList = ['第一学期', '第二学期']
const activeTerm = ref('')
const dateRange = ref()
const columns = [
  { prop: 'index', label: '序号' },
  { prop: 'name', label: '实训名称' },
  { prop: 'type', label: '类型' },
  { prop: 'report', label: '实训报告' },
  { prop: 'exam', label: '考试批阅' },
  { prop: 'analysis', label: '课程分析' },
]
const list = ref([
  {
    title: '第一阶段:直流电动机虚拟仿真实验',
    data: [
      {
        index: '1.1',
        name: '直流电动机虚拟仿真实验',
        type: 'Vr交互',
        report: '未绑定实训报告',
        exam: '未绑定考试',
      },
    ],
  },
  { title: '第二阶段:直流电动机虚拟仿真实验', data: [{ index: '1.1' }] },
  { title: '第三阶段:直流电动机虚拟仿真实验', data: [{ index: '1.1' }] },
  { title: '第四阶段:直流电动机虚拟仿真实验', data: [{ index: '1.1' }] },
  { title: '第五阶段:直流电动机虚拟仿真实验', data: [{ index: '1.1' }] },
  { title: '第六阶段:直流电动机虚拟仿真实验', data: [{ index: '1.1' }] },
])

const handleChange = () => {}
</script>
<style lang="scss" scoped>
.train-list {
  .top {
    display: grid;
    grid-template-columns: 3em 47em auto 5em;
    align-items: center;
    .el-select {
      width: 200px;
    }
    :deep(.el-date-editor) {
      width: 17em;
      .el-range-input {
        width: 7em;
      }
    }
  }
}
</style>
