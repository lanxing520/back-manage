<template>
  <!-- 督学面板 -->
  <div class="inspector-panel">
    <div class="top-part">
      <div class="online-number">当前在线:{{ onlineNumber }}</div>
      <span>班级:</span>
      <el-select v-model="filter.class" :placeholder="'请选择'">
        <el-option
          v-for="option in classList"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <span>在线状态: </span>
      <el-radio-group v-model="filter.status">
        <el-radio-button
          v-for="item in statusList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        />
      </el-radio-group>

      <el-button type="primary">数据PK</el-button>
      <el-button type="primary" @click="exportData">导出数据</el-button>
    </div>

    <div class="list-wrapper">
      <CheckBox :is-check-all="false" :item-list="dataList">
        <template #default="{ props }">
          <div>
            <div class="flex-wrapper out-wrapper">
              <div class="left-top-class">班级:{{ props.class }}</div>
              <div class="left">
                <img class="person-img" :src="props.img" alt="" />
                <div>{{ props.name }}</div>
                <div>{{ props.id }}</div>
              </div>
              <div class="right">
                <div><span class="m-r-1">得分:</span> {{ props.score }}分</div>
                <div class="flex-wrapper">
                  <span class="m-r-1">进度:</span> <el-progress :percentage="props.progress" />
                </div>
                <div><span class="m-r-1">用时:</span>{{ props.takeTime }}</div>
                <div><span class="m-r-1">步骤数据:</span>{{ props.step }}条</div>
              </div>
            </div>
            <el-button class="bottom-button">查看实验数据</el-button>
          </div>
        </template>
      </CheckBox>
    </div>
  </div>
</template>
<script setup lang="ts">
import CheckBox from '@/components/element-plus/CheckBox.vue'

const onlineNumber = ref(0)
const filter = ref({ class: '', status: '全部' })
const classList = ref([{ label: '1', value: '1' }])
const statusList = [
  { label: '全部', value: '全部' },
  { label: '在线', value: '在线' },
  { label: '离线', value: '离线' },
]
const dataList = ref([
  {
    name: '张三',
    id: 'HDS456564561',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564562',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564563',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564564',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS45f564564',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564123',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564gfd',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564234',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564gfd',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
  {
    name: '张三',
    id: 'HDS456564234',
    class: '1',
    img: '',
    status: '离线',
    score: '0',
    progress: 10,
    takeTime: '00时03分11秒',
    step: '1',
  },
])
const exportData = () => {}
</script>
<style lang="scss" scoped>
.inspector-panel {
  // margin:0 1rem;
  margin-right: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  .el-button {
    margin-left: 0;
  }
  .m-r-1 {
    margin-right: 5px;
  }
  .top-part {
    position: relative;
    display: flex;
    justify-content: right;
    gap: 15px;
    line-height: 32px;
    .el-select {
      width: 150px;
    }
    .online-number {
      position: absolute;
      right: 0;
      top: -2rem;
      font-size: 12px;
      padding: 0 5px;
      color: #45a5fa;
      background-color: rgba(69, 165, 250, 0.1);
    }
  }
  .list-wrapper {
    padding: 0 0.5em;
  
    .out-wrapper {
      position: relative;
      border: 1px solid #aeaeae;
      padding: 10px;
      padding-top: 2rem;
      .left-top-class {
        position: absolute;
        left: 0;
        top: 5px;
        padding: 3px 10px 3px 3px;
        background-color: #f5f5f5;
        border-radius: 0 15px 15px 0;
      }
    }
    .flex-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-grow: 1;
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        .person-img {
          width: 6rem;
          height: 6rem;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .el-progress {
          width: 100%;
          min-width: 200px;
          margin-left: 3px;
        }
      }
    }
  }
  .bottom-button {
    width: 100%;
    color: #45a5fa;
    border-radius: 0;
    border-color: #aeaeae;
    border-top: none;

    &:hover {
      background-color: #45a5fa;
      color: #fff;
    }
  }
  :deep(.el-checkbox-group) {
    // width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    height: calc(100vh - 220px);
    overflow: auto;
    background-color: #fff;
    .el-checkbox {
      position: relative;
      display: block;
      // width: 100%;
      margin-right: 0;
      height: 210px;
      // border: 1px solid #aeaeae;
      .el-checkbox__input {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .el-checkbox__label {
        width: 100%;
        padding-left: 0;
      }
    }
    .is-checked .el-checkbox__label {
      color: #606266 !important;
    }
  }
}
</style>
