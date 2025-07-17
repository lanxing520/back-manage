<template>
  <div class="home-settings">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人主页地址</span>
        </div>
      </template>
      <div class="homepage-url">
        <el-input v-model="homepageUrl" readonly>
          <template #append>
            <el-button :icon="CopyDocument" @click="copyUrl" />
          </template>
        </el-input>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>主讲课程</span>
        </div>
      </template>
      <div v-if="mainCourse" class="course-item">
        <div class="course-info">
          <el-image :src="mainCourse.cover" fit="cover" class="course-cover" />
          <div class="course-details">
            <h4>{{ mainCourse.name }}</h4>
            <p>{{ mainCourse.description }}</p>
          </div>
        </div>
        <el-button type="danger" @click="removeMainCourse">移除</el-button>
      </div>
      <el-button v-else type="primary" @click="showCourseDialog = true">添加主讲课程</el-button>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>精选课程</span>
          <el-switch v-model="featuredCoursesEnabled" active-text="开启" inactive-text="关闭" />
        </div>
      </template>
      <div v-if="featuredCoursesEnabled">
        <div v-for="course in featuredCourses" :key="course.id" class="course-item">
          <div class="course-info">
            <el-image :src="course.cover" fit="cover" class="course-cover" />
            <div class="course-details">
              <h4>{{ course.name }}</h4>
              <p>{{ course.description }}</p>
            </div>
          </div>
          <el-button type="danger" @click="removeFeaturedCourse(course.id)">移除</el-button>
        </div>
        <el-button type="primary" @click="showFeaturedDialog = true">添加精选课程</el-button>
      </div>
      <div v-else class="disabled-hint">精选课程功能已关闭，不会在个人主页显示</div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>学员评价</span>
          <el-switch v-model="reviewsEnabled" active-text="开启" inactive-text="关闭" />
        </div>
      </template>
      <div v-if="reviewsEnabled">
        <p>学员评价功能已开启，将会在个人主页显示学员对您的评价</p>
      </div>
      <div v-else class="disabled-hint">学员评价功能已关闭，不会在个人主页显示</div>
    </el-card>

    <!-- 添加主讲课程对话框 -->
    <el-dialog v-model="showCourseDialog" title="添加主讲课程" width="800px">
      <el-table :data="availableCourses" @row-click="selectMainCourse">
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="students" label="学员数" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click.stop="selectMainCourse(row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加精选课程对话框 -->
    <el-dialog v-model="showFeaturedDialog" title="添加精选课程" width="800px">
      <el-table :data="availableCourses" @row-click="addFeaturedCourse">
        <el-table-column prop="name" label="课程名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="students" label="学员数" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click.stop="addFeaturedCourse(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const homepageUrl = ref('https://mool.edu/teacher/T20230001')

const mainCourse = ref(null)
const featuredCourses = ref([])
const featuredCoursesEnabled = ref(true)
const reviewsEnabled = ref(true)

const showCourseDialog = ref(false)
const showFeaturedDialog = ref(false)

const availableCourses = ref([
  {
    id: 1,
    name: '人工智能基础',
    category: '计算机科学',
    students: 1250,
    description: '入门级人工智能课程，适合零基础学员',
    cover: 'https://via.placeholder.com/120x80',
  },
  {
    id: 2,
    name: '机器学习实战',
    category: '数据科学',
    students: 980,
    description: '通过实际案例学习机器学习算法',
    cover: 'https://via.placeholder.com/120x80',
  },
  {
    id: 3,
    name: '深度学习进阶',
    category: '人工智能',
    students: 650,
    description: '深入讲解神经网络和深度学习',
    cover: 'https://via.placeholder.com/120x80',
  },
  {
    id: 4,
    name: 'Python编程',
    category: '编程语言',
    students: 2100,
    description: '从零开始学习Python编程',
    cover: 'https://via.placeholder.com/120x80',
  },
])

const copyUrl = () => {
  navigator.clipboard.writeText(homepageUrl.value)
  ElMessage.success('已复制到剪贴板')
}

const selectMainCourse = (course) => {
  mainCourse.value = course
  showCourseDialog.value = false
  ElMessage.success('已设置主讲课程')
}

const removeMainCourse = () => {
  mainCourse.value = null
  ElMessage.success('已移除主讲课程')
}

const addFeaturedCourse = (course) => {
  if (featuredCourses.value.some((c) => c.id === course.id)) {
    ElMessage.warning('该课程已在精选列表中')
    return
  }
  featuredCourses.value.push(course)
  showFeaturedDialog.value = false
  ElMessage.success('已添加精选课程')
}

const removeFeaturedCourse = (id) => {
  featuredCourses.value = featuredCourses.value.filter((c) => c.id !== id)
  ElMessage.success('已移除精选课程')
}
</script>

<style scoped>
.home-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.homepage-url {
  max-width: 600px;
}

.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--el-border-color-light);
}

.course-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.course-cover {
  width: 120px;
  height: 80px;
  border-radius: 4px;
}

.course-details {
  flex: 1;
}

.course-details h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.course-details p {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.disabled-hint {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
