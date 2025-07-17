<template>
  <div class="content-wrapper exam-content-wrapper">
    <section v-if="!showAdd">
      <div class="top">
        <span>所属分类:</span>
        <el-select v-model="search.category" placeholder="请选择所属分类">
          <el-option
            v-for="option in categoryOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <span>状态:</span>
        <el-select v-model="search.status" placeholder="请选择状态">
          <el-option
            v-for="option in statusOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-input v-model="search.examName" placeholder="可搜索考试名"></el-input>
        <el-button type="primary" class="add-button" @click="addExam">新增考试</el-button>
      </div>
      <div class="exam-item-wrapper">
        <div class="exam-item" v-for="(item, i) in examList">
          <div class="part-one">
            <div class="ring-chart-out">
              <RingProgress :data="item.ringVal" />
              <span class="center-text absolute-center">{{ item.ringVal }}%</span>
            </div>
            <div class="text-align-center">已交{{ item.submited }}</div>
            <div class="text-align-center">已阅{{ item.read }}</div>
          </div>

          <div class="part-two">
            <div class="name">{{ item.name }} 【{{ item.status }}】</div>
            <div class="info-wrapper">
              <span class="category-wrapper">
                <span class="c">分类</span>
                <span class="category text-truncate" :title="item.category">{{
                  item.category
                }}</span>
              </span>
              <span>开始日期{{ item.startTime }}</span>
              <span>题目数量{{ item.testNumber }}</span>
              <span>结束日期{{ item.endTime }}</span>
            </div>
          </div>
          <div class="part-three">
            <LineChart :data="item.lineData" />
          </div>
          <div class="part-four">
            <div class="m-b-1"><el-button type="primary">发布考试</el-button></div>
            <el-button>编辑考卷</el-button>
          </div>
        </div>
      </div>
    </section>
    <AddExam v-else />
  </div>
</template>
<script setup lang="ts">
import RingProgress from '@/components/chart/RingProgress.vue'
import LineChart from '@/components/chart/LineChart.vue'
import AddExam from './AddExam.vue'

const categoryOptions = [{ label: 'xx', value: 'xx' }]
const statusOptions = [{ label: 'xx', value: 'xx' }]
const showAdd = ref(true)
const search = reactive({
  category: '',
  status: '',
  examName: '',
})

const examList = ref([
  {
    ringVal: 96,
    submited: 0,
    read: 0,
    name: '001',
    status: '未发布',
    category: '水处理工程技术虚拟XXXXXXXXXXXXX',
    testNumber: 0,
    startTime: '2023-04-12 12:00',
    endTime: '2023-04-27 12:00',
    lineData: [
      { name: '0~59分', value: 0.1 },
      { name: '60~69分', value: 0.2 },
      { name: '70~79分', value: 0.3 },
      { name: '80~89分', value: 0.3 },
      { name: '90~100分', value: 0.1 },
    ],
  },
])

const addExam = () => {
  showAdd.value = true
}
</script>
<style lang="scss" scoped>
.exam-content-wrapper {
  .top {
    position: relative;
    display: grid;
    grid-template-columns: 4.5em 20% 2.5em 20% 20%;
    gap: 0.5em;
    .add-button {
      position: absolute;
      right: 0;
    }
  }
  .exam-item-wrapper {
    .exam-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
      padding: 1em;
      border: 1px solid #aeaeae;
      margin-top: 1em;
      .part-one {
        .ring-chart-out {
          position: relative;
          width: 6rem;
          height: 6rem;
          margin-bottom: 1em;
          .center-text {
            position: absolute;
          }
        }
      }
      .part-two {
        padding-left: 2em;
        .name {
          font-weight: bold;
          font-size: 20px;
        }
        .info-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1em 0;
          margin-top: 2em;

          .category-wrapper {
            display: flex;
            align-items: center;
          }
          .c {
            display: inline-block;
            margin-right: 10px;
          }
          .category {
            display: inline-block;
            color: #6fccb0;
            width: 9em;
          }
        }
      }
      .part-three {
        min-width: 20rem;
        width: 30%;
      }
      .m-b-1 {
        margin-bottom: 0.5em;
      }
    }
  }
}
</style>
