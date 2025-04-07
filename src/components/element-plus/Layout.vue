<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="200px">
      <div class="top-title-wrapper">
        <img src="@assets/img/main-page/school_icon.png" alt="" />
        <div class="top-title">虚拟仿真教学共享平台</div>
      </div>
      <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleMenuSelect">
        <el-menu-item v-for="(item, i) in routerList" :key="i" :index="i + ''">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区域 -->
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const routerList = [
  { name: '首页', router: '/platform/homepage' },
  { name: '课程管理', router: '/platform/subject-manage' },
  { name: '实训管理', router: '/platform/training-manage' },
  { name: '考试管理', router: '/platform/exam-manage' },
  { name: '指导书管理', router: '/platform/instruction-book' },
  { name: '云盘', router: '/platform/cloud-disk' },
]
// 处理菜单选择
const handleMenuSelect = (index) => {
  router.push(routerList[index].router)
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.top-title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  .top-title {
    font-size: 24px;
  }
}

.el-aside {
  background: linear-gradient(to bottom, #57a1ff, #005ffd);
  color: #fff;
  width: 263px;
}

.el-menu {
  background: none;
  border-right: none;
  .el-menu-item {
    font-size: 20px;
    color: #fff;
    &.is-active {
      background: rgba(255, 255, 255, 0.5);
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.el-main {
  padding: 0;
}
</style>
