<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="200px">
      <div class="top">
        <img class="back-icon" src="@img/back_icon.png" alt="" />
        <div class="back-to-home" @click="backToHome">回到首页</div>
      </div>

      <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleMenuSelect">
        <el-menu-item v-for="(item, i) in menuList" :key="i" :index="i + ''">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区域 -->
    <el-container>
      <el-main>
        <AccountInfo v-if="activeTab === '账号信息'" />
        <AccountSecurity v-if="activeTab === '账号安全'" />
        <HomeSettings v-if="activeTab === '主页设置'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AccountInfo from './AccountInfo.vue'
import AccountSecurity from './AccountSecurity.vue'
import HomeSettings from './HomeSettings.vue'
const router = useRouter()
const activeTab = ref('账号信息')
const menuList = ref([{ name: '账号信息' }, { name: '账号安全' }, { name: '主页设置' }])

const backToHome = () => {
  router.push('/platform/homepage')
}
const handleMenuSelect = (i) => {
  activeTab.value = menuList.value[i].name
}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .back-icon {
    width: 1rem;
    height: 1rem;
  }
  .back-to-home {
    color: #1295da;
    cursor: pointer;
  }
}
</style>
