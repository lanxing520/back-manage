<template>
  <div class="main-page">
    <section class="top-container">
      <div class="top-title-warpper">
        <img src="@assets/img/main-page/school_icon.png" alt="" />
        <div class="college-name-wrapper">
          <div class="college-name">川北医学院</div>
          <div class="college-name-english">North Sichuan Medical College</div>
        </div>
        <div class="column-line"></div>
        <div class="platform-name">虚拟仿真实训教学共享平台</div>

        <div class="right-top-wrapper">
          <span class="right-top-text" v-for="(item, i) in rightTopList" :key="i">{{ item }}</span>
        </div>
      </div>

      <div class="second-line">
        <div class="router-button-wrapper">
          <div
            class="router-button"
            @click="clickRouter(item, i)"
            :class="{ active: activeIndex === i }"
            v-for="(item, i) in routerNameList"
            :key="i"
          >
            {{ item }}
          </div>
        </div>
        <div class="login" @click="login">登录</div>
      </div>
    </section>

    <section class="middle-filter-container">
      <div class="filter-group-line" v-for="(item1, i1) in filterGroup" :key="i1">
        <span class="filter-title">{{ item1.name }}:</span>
        <span
          class="filter-item"
          :class="{ active: item2 === choseFilterList[i1] }"
          v-for="(item2, i2) in item1.list"
          :key="i2"
          @click="clickFilter(i1, item2)"
        >
          {{ item2 }}
        </span>
      </div>
      <span class="order-wrapper">
        <span>排序:默认</span>
        <span>发布时间:顺序倒序</span>
      </span>
    </section>
    <section class="lesson-card-wrapper">
      <LessonCard v-for="(item, i) in 12" :key="i" />
    </section>
  </div>
</template>
<script setup>
import LessonCard from '@/components/LessonCard.vue'
const router = useRouter()

const routerNameList = ['首页', '虚拟仿真课程', '仿真实训中心', '新闻与通告']
const rightTopList = ['联系我们', '常见问题']
const filterGroup = ref([
  { name: '课程类型', list: ['实训慕课', '实训项目'] },
  { name: '学科类型', list: ['全部', '工学'] },
  { name: '共享等级', list: ['全部', '精品资源', '校级项目'] },
])
const choseFilterList = reactive(['', '全部', '全部'])
const activeIndex = ref(null)
const clickRouter = (item, i) => {
  activeIndex.value = i
  switch (i) {
    case 0:
      router.push('/platform/homepage')
      break
  }
}

const login = () => {
  router.push('login')
}

const clickFilter = (index, item) => {
  choseFilterList[index] = item
}
</script>
<style lang="scss" scoped>
.main-page {
  // padding: 0 15%;
  .top-container {
    color: #fff;
    background: #005ffd;
    padding: 0 15%;

    .top-title-warpper {
      position: relative;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      .college-name-wrapper {
        .college-name {
          font-size: 40px;
        }
        .college-name-english {
          font-size: 16px;
        }
      }
      .column-line {
        width: 1px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.5);
        margin: 0 1rem;
      }
      .platform-name {
        font-size: 36px;
      }

      .right-top-wrapper {
        position: absolute;
        display: flex;
        gap: 0.8rem;
        right: 0;
        top: 5px;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .second-line {
      display: flex;
      margin-left: 5rem;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      // height: 3rem;
      .router-button-wrapper {
        display: flex;
        gap: 2rem;

        .router-button {
          padding: 1rem;
          cursor: pointer;
          &.active {
            background-color: rgba(255, 255, 255, 0.4);
          }
        }
      }
      .login {
        cursor: pointer;
      }
    }
  }

  .middle-filter-container {
    background: #ebf0f7;
    padding: 10px 15%;
    .filter-group-line {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      .filter-title {
        font-size: 17px;
        color: #000;
        font-weight: bold;
      }
      .filter-item {
        color: #676e7e;
        cursor: pointer;
        padding: 0 10px;
        &.active {
          color: #fff;
          background-color: #005ffd;
          border-radius: 5px;
        }
      }
    }
    .order-wrapper {
      display: flex;
      gap: 3rem;
      color: #676e7e;
    }
  }

  .lesson-card-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    // width: 100%;
    padding: 0 15%;
    margin-top: 1rem;
  }
}
</style>
