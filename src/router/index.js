import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { loginRoutes } from './login'

const MainPage = () => import('@/views/main-page/index.vue')
const PlatformPage = () => import('@/views/platform/index.vue')
const HomePage = () => import('@/views/platform/homepage/index.vue')
const SubjectManage = () => import('@/views/platform/subject-manage/index.vue')
const TrainingManage = () => import('@/views/platform/training-manage/index.vue')
const ExamManage = () => import('@/views/platform/exam-manage/index.vue')
const InstructionBook = () => import('@/views/platform/instruction-book/index.vue')
const CloudDisk = () => import('@/views/platform/cloud-disk/index.vue')
const AccountManagement = () => import('@/views/account-manage/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...loginRoutes,
    {
      path: '/',
      name: 'main-page',
      component: MainPage,
    },
    {
      path: '/account-manage',
      name: 'account-manage',
      component: AccountManagement,
    },
    {
      path: '/platform',
      name: 'platform',
      component: PlatformPage,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          component: HomePage,
        },
        {
          path: 'subject-manage',
          name: 'subject-manage',
          component: SubjectManage,
        },
        {
          path: 'training-manage',
          name: 'training-manage',
          component: TrainingManage,
        },
        {
          path: 'exam-manage',
          name: 'exam-manage',
          component: ExamManage,
        },
        {
          path: 'instruction-book',
          name: 'instruction-book',
          component: InstructionBook,
        },
        {
          path: 'cloud-disk',
          name: 'cloud-disk',
          component: CloudDisk,
        },
      ],
    },
  ],
})

export default router
