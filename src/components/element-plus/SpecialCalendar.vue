<template>
  <!-- <el-calendar v-model="date" /> -->
  <div class="special-calendar">
    <el-config-provider :locale="zhCn">
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <div class="top-button-wrapper">
            <div @click="selectDate('prev-year')">
              <el-icon><DArrowLeft /></el-icon>
            </div>
            <div @click="selectDate('prev-month')">
              <el-icon><ArrowLeft /></el-icon>
            </div>
            <span class="date-wrapper">{{ date }}</span>
            <div @click="selectDate('next-month')">
              <el-icon><ArrowRight /></el-icon>
            </div>
            <div @click="selectDate('next-year')">
              <el-icon><DArrowRight /></el-icon>
            </div>
          </div>
        </template>
        <template #date-cell="{ data }">
          <p class="own-day" :class="{ 'has-subject': hasSubjectDateList.includes(data.day) }">
            {{ data.day.split('-')[2] }}
          </p>
        </template>
      </el-calendar>
      <div class="bottom-tips">
        <div class="left">今天</div>
        <div class="right">今日有课</div>
      </div>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// const date = ref(new Date())
const hasSubjectDateList = ['2025-03-05', '2025-03-10']
const calendar = ref()
const selectDate = (val: string) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
</script>
<style lang="scss" scoped>
.special-calendar {
  background: #ebf0f7;
  padding-bottom: 10px;
  .el-calendar {
    background: transparent;
  }

  .top-button-wrapper {
    width: 100%;

    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1.5em 1em 1fr 1.5em 1em;
    padding: 0 6rem;
    text-align: center;
    line-height: 15px;
    & > div {
      cursor: pointer;
    }
    .date-wrapper {
      text-wrap: nowrap;
    }
  }
}
:deep(.el-calendar__header) {
  padding: 5px 0;
  border-bottom: none;
}
:deep(.el-calendar__body) {
  padding: 0;
  td {
    border: none !important;
  }
}
:deep(.el-calendar-table) thead th {
  padding: 0;
  padding-bottom: 10px;
}
:deep(.el-calendar-table .el-calendar-day) {
  padding: 0;
  height: 28px;
  text-align: center;
  font-size: 10px;
}
:deep(.el-calendar-table td.is-selected) {
  background-color: transparent;
}
:deep(.is-today) {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    background-color: #1983ff;
  }
  // background-color: #1983ff !important;
  color: #fff !important;
  .el-calendar-day {
    .own-day {
    }
  }
}
.own-day {
  position: relative;
  user-select: none;
  &.has-subject {
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #ff1919;
    }
  }
}

@mixin text($size, $bg-color) {
  content: '';
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  width: $size;
  height: $size;
  background: $bg-color;
  border-radius: 50%;
}

.bottom-tips {
  display: flex;
  justify-content: space-around;
  // gap: 5rem;
  margin-left: 4rem;
  .left {
    text-wrap: nowrap;
    position: relative;
    &::before {
      @include text(1.5rem, #1983ff);
    }
  }

  .right {
    text-wrap: nowrap;
    position: relative;
    &::before {
      @include text(1rem, #ff1919);
    }
  }
}
</style>
