<template>
  <common-wrapper>
    <div class="tabs-container">
      <span
        class="tab-item"
        :class="{ active: activeTab === item }"
        v-for="(item, i) in tabsList"
        :key="i"
      >
        {{ item }}
      </span>
    </div>
    <div class="content-wrapper">
      <section class="content-one">
        <div class="block-one">
          <block-wrapper title="待办事项">
            <div class="ring-progress-group">
              <div class="ring-progress-item" v-for="(item, i) in toDoEvents">
                <RingProgress
                  :progress="(item.value / item.total) * 100"
                  :progress-color="ringColorList[i]"
                />
                <div class="value-wrapper">
                  <span class="value">{{ item.value }}</span>
                  <span class="total">/{{ item.total }}</span>
                </div>
                <div class="name-wrapper">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </block-wrapper>
        </div>
        <div class="block-two">
          <block-wrapper title="通知公告">
            <ul>
              <li class="flex-between" v-for="(item, i) in noticeAnnouncementList" :key="i">
                <span>{{ item.value }}</span>
                <span>{{ item.time }}</span>
              </li>
            </ul>
          </block-wrapper>
        </div>
        <div class="block-three">
          <block-wrapper title="日程安排">
            <SpecialCalendar />
            <EventList />
          </block-wrapper>
        </div>
      </section>
      <section class="content-two">
        <block-wrapper title="学习进度">
          <LineChart :line-data="defaultLineData" />
        </block-wrapper>

        <block-wrapper class="finish-wrapper" title="作业完成率">
          <div class="homework-finish-rate">
            <RingProgress
              :progress="homeworkFinishRate"
              progress-color="#1882FF"
              :radius="['70%', '90%']"
              :angel-range="[90, -270]"
            />
            <div class="ring-circle-text">
              <div class="rate-number">{{ homeworkFinishRate }}%</div>
              <div>完成率</div>
            </div>
          </div>
        </block-wrapper>

        <block-wrapper title="成绩分布">
          <BarChart :chart-data="defaultLineData" />
        </block-wrapper>
      </section>
    </div>
  </common-wrapper>
</template>
<script setup>
import CommonWrapper from '../components/CommonWrapper.vue'
import BlockWrapper from '../components/BlockWrapper.vue'
import RingProgress from '@/components/RingProgress.vue'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
import SpecialCalendar from '@/components/SpecialCalendar.vue'
import EventList from '@/components/EventList.vue'

const tabsList = ['首页']
const activeTab = ref('首页')

const ringColorList = ['#1983FF', '#F39E41', '#5DC06A', '#FB6E60']
const toDoEvents = ref([
  { name: '待批改作业', value: 5, total: 20 },
  { name: '待审核', value: 1, total: 2 },
  { name: '学生互评', value: 10, total: 20 },
  { name: '待审核', value: 1, total: 3 },
])

const noticeAnnouncementList = ref([
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
  {
    value: '【重大成果】我校学生依托虚拟仿真资源获得世界职业院校技能大赛金奖',
    time: '2024-10',
  },
])
const defaultLineData = ref([
  { name: '一月', value: 25 },
  { name: '二月', value: 20 },
  { name: '三月', value: 30 },
  { name: '四月', value: 20 },
  { name: '五月', value: 40 },
  { name: '六月', value: 60 },
  { name: '七月', value: 90 },
])
const homeworkFinishRate = ref(65)
</script>
<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  margin-top: 0.5rem;
}
.content-one {
  display: grid;
  grid-template-columns: 2.8fr 1fr;
  grid-template-rows: 1fr 1.57fr;
  height: 500px;
  gap: 1rem;
  // margin: 1rem;
  .block-one {
    // height: 200px;
    .ring-progress-group {
      display: flex;
      align-items: center;
      height: 170px;
      gap: 3rem;
      margin-left: 1rem;
      .ring-progress-item {
        width: 110px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        position: relative;
        .value-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -80%);
          .value {
            font-size: 36px;
            font-weight: bold;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .name-wrapper {
          width: max-content;
          // position: absolute;
          // left: 50%;
          // bottom: -30px;
          // transform: translateX(-50%);
        }
      }
    }
  }
  .block-two {
    grid-row-start: 2;
  }
  .block-three {
    grid-row-start: 1;
    grid-row-end: span 2; /* 跨越 2 行 */
    overflow: auto;

    :deep(.event-list-wrapper) {
      height: 190px;
      overflow: auto;
    }
  }
}

.finish-wrapper :deep(.block-content) {
  display: flex;
  justify-content: center;
}
.content-two {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  .homework-finish-rate {
    position: relative;
    width: 225px;
    height: 225px;
    .ring-circle-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.8rem;
      color: #676e7e;
      text-align: center;

      .rate-number {
        font-size: 2rem;
      }
    }
  }
}
</style>
