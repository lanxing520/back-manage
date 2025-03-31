<template>
  <section class="content-wrapper">
    <div class="block-one">
      <div class="block-title">添加学术策划人员</div>
      <el-autocomplete
        v-model="userInfo"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入教师用户名/手机号"
        class="input-wrapper"
        @select="handleSelect"
        :prefix-icon="Search"
        clearable
      >
        <template #default="{ item }">
          <div class="teacher-item-wrapper">
            <img class="teacher-picture" :src="item.imgUrl" />
            <div class="item-right">
              <div class="right-top">
                <span class="teacher-name">{{ item.name }}</span> <span>{{ item.degree }}</span>
              </div>
              <span>{{ item.detail }}</span>
            </div>
          </div>
        </template>
      </el-autocomplete>
    </div>
    <div class="other-block">
      <div class="block-title">编辑学术策划人员</div>
      <el-autocomplete
        v-model="userInfo"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入教师用户名/手机号"
        class="input-wrapper"
        @select="handleSelect"
        :prefix-icon="Search"
        clearable
      >
        <template #default="{ item }">
          <div class="teacher-item-wrapper">
            <img class="teacher-picture" :src="item.imgUrl" />
            <div class="item-right">
              <div class="right-top">
                <span class="teacher-name">{{ item.name }}</span> <span>{{ item.degree }}</span>
              </div>
              <span>{{ item.detail }}</span>
            </div>
          </div>
        </template>
      </el-autocomplete>
      <section class="teacher-detail-wrapper">
        <div class="teacher-item-wrapper">
          <img class="teacher-picture" :src="selectTeacher.imgUrl" />
          <div class="item-right">
            <div class="right-top">
              <span class="teacher-name">{{ selectTeacher.name }}</span>
              <span>职称：{{ selectTeacher.degree }}</span>
            </div>
            <span>{{ selectTeacher.detail }}</span>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
const userInfo = ref('')
const selectTeacher = ref({})
const links = ref([])

const loadAll = () => {
  return [
    {
      name: '李某',
      degree: '副教授',
      detail: '主要从事写作**************************************',
    },
  ]
}

let timeout
const querySearchAsync = (queryString, cb) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.indexOf(queryString) === 0
  }
}

const handleSelect = (item) => {
  selectTeacher.value = item
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
})
</script>
<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: calc(100vh - 130px);
  overflow: auto;
  :deep(.input-wrapper) {
    width: 335px;
  }
  .block-one {
    height: 300px;
  }
  .teacher-item-wrapper {
    display: grid;
    grid-template-columns: 80px auto;
    align-items: center;
    .teacher-picture {
    }
    .item-right {
      display: flex;
      flex-direction: column;
      gap: 1em;
      .right-top {
        display: flex;
        gap: 1em;
      }
    }
  }
  .teacher-detail-wrapper {
    display: grid;
    grid-template-columns: 80px auto;
    align-items: center;
    padding: 15px;
    background-color: #fafafa;
    border-radius: 5px;
    margin-top: 1em;
    width: 49%;
    .teacher-picture {
    }
    .item-right {
      display: flex;
      flex-direction: column;
      gap: 1em;
      .right-top {
        display: flex;
        align-items: end;
        gap: 1em;
        .teacher-name {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
