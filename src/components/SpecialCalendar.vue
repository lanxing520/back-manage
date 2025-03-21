<template>
  <!-- <el-calendar v-model="date" /> -->
  <el-config-provider :locale="zhCn">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <el-button size="small" @click="selectDate('prev-year')"> << </el-button>
        <el-button size="small" @click="selectDate('prev-month')"> < </el-button>
        <span>{{ yearMonth }}</span>
        <el-button size="small" @click="selectDate('next-month')">> </el-button>
        <el-button size="small" @click="selectDate('next-year')"> >> </el-button>
      </template>
      <template #date-cell="{ data }">
        <p class="own-day" :class="{ 'has-subject': hasSubjectDateList.includes(data.day) }">
          {{ data.day.split('-')[2] }}
        </p>
      </template>
    </el-calendar>
  </el-config-provider>
</template>
<script setup>
const date = ref(new Date())
const hasSubjectDateList = ['2025-03-05', '2025-03-10']
const yearMonth = date.value.getFullYear() + '年' + (date.value.getMonth() + 1) + '月'
const calendar = ref()
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
</script>
<style lang="scss" scoped>
:deep(.el-calendar__header) {
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
.own-day {
  position: relative;
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
      background: red;
    }
  }
}
</style>
