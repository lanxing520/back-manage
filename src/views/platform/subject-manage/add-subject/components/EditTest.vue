<template>
  <div class="test-wrapper">
    <span>{{ props.test.type }}考试:</span>
    <div class="flex-wrapper">
      <el-input
        v-if="props.test.type === '其他'"
        v-model="props.test.name"
        placeholder="请输入考试名称"
      ></el-input>
      <el-input v-model="props.test.paperName" placeholder="请输入试卷名称"></el-input>
    </div>

    <span>成绩权重:</span>
    <el-slider v-model="props.test.rate" show-input />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  test: {
    type: string
    name?: string
    paperName: string
    rate: number
  }
}>()
</script>
<style lang="scss" scoped>
.test-wrapper {
  display: grid;
  grid-template-columns: 5em auto 6em 400px;
  align-items: center;
  margin-bottom: 1em;
  .flex-wrapper {
    display: flex;
    gap: 1em;
    padding: 0 2em;
    .el-input {
      width: 100%;
    }
  }
}
</style>
