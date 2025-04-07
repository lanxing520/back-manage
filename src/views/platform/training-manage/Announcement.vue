<template>
  <div class="announcement">
    <div class="top-filter">
      <el-input v-model="filter.search" placeholder="请输入公告标题" />
      <el-select v-model="filter.x1" :placeholder="'请选择'">
        <el-option
          v-for="option in options1"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-select v-model="filter.x2" :placeholder="'请选择'">
        <el-option
          v-for="option in options1"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-button type="primary">搜索</el-button>

      <el-button type="primary">发布新公告</el-button>
    </div>

    <div class="card-wrapper">
      <el-card
        class="card-item"
        v-for="(item, i) in announcementList"
        :key="i"
        @click="checkCard(item)"
      >
        <h3 class="card-title">{{ item.title }}</h3>
        <div class="card-bottom">
          <span>时间：{{ item.time }}</span>
          <span>
            <span>发布者：{{ item.publisher }}</span>
            <span class="m-l">浏览量：{{ item.read }}</span>
          </span>
        </div>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="cardDetailDialog" align-center title="预览" width="60%" append-to-body>
    <el-card>
      <h2 class="align-center">{{ announceDetail.title }}【课程公告】</h2>
      <div class="align-center">课程名称：{{ announceDetail.name }}</div>
      <div class="align-center gray">
        <span>作者：{{ announceDetail.publisher }}</span>
        <span>时间： {{ announceDetail.time }}</span>
      </div>
 
      <p>
        {{ announceDetail.content }}
      </p>
    </el-card>
  </el-dialog>
</template>
<script setup>
const filter = ref({
  search: '',
  x1: '',
  x2: '',
})
const options1 = ref([
  { label: 'xx', value: 'xx' },
  { label: 'xx1', value: 'xx1' },
  { label: 'xx2', value: 'xx2' },
])
const announcementList = ref([
  {
    title: '【课程公告】课程开课通知',
    time: '2023-05-04 18:00:45',
    publisher: '201512451',
    read: '85',
  },
])
const announceDetail = ref({
  title: '课程开课通知',
  name: '水处理工程技术虚拟仿真实训',
  publisher: '25155425',
  time: '2023-05-12 15:00:25',
  content: `各位学习者:
大家好，水处理工程技术虚拟仿真实训课程今天上线发布了，欢迎大家进行学习。在学习过程中有任何问题，请及时在答疑讨论区发言，祝大家学习愉快。`,
})
const cardDetailDialog = ref(false)
const checkCard = (item) => {
  cardDetailDialog.value = true
}
</script>
<style lang="scss" scoped>
.announcement {
  padding-right: 1rem;
  .top-filter {
    display: flex;
    gap: 1rem;
  }
  .card-item {
    margin-top: 1rem;
    cursor: pointer;
    .card-title {
      font-size: 25px;
      margin-bottom: 1rem;
    }
    .card-bottom {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 12px;
      color: #c5c9db;
    }
    .m-l {
      margin-left: 1rem;
    }
  }
}
.align-center{
  text-align: center;
}
.gray{
  display: flex;
  gap: 2rem;
  color: #c5c9db;
  justify-content: center;
}
</style>
