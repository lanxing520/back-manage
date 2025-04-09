import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAccountStore = defineStore('account', () => {
  // 账号信息
  const accountInfo = ref({
    username: 'teacher123',
    userId: 'T20230001',
    gender: '男',
    phone: '13800138000',
    email: 'teacher@mool.edu',
    registerTime: '2023-01-15 10:30:45',
    lastLoginTime: '2023-06-20 15:20:10',
    avatar: ''
  });

  // 教师资料
  const teacherInfo = ref({
    name: '张老师',
    title: '副教授',
    bio: '计算机科学专业，主要研究方向为人工智能与机器学习。'
  });

  // 主页设置
  const homeSettings = ref({
    mainCourse: null,
    featuredCourses: [],
    featuredCoursesEnabled: true,
    reviewsEnabled: true
  });

  // 计算属性
  const encryptedPhone = computed(() => {
    const phone = accountInfo.value.phone;
    return phone ? `${phone.substring(0, 3)}****${phone.substring(7)}` : '';
  });

  const encryptedEmail = computed(() => {
    const email = accountInfo.value.email;
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex < 3) return email;
    return `${email.substring(0, 3)}****${email.substring(atIndex)}`;
  });

  // 方法
  const updateTeacherInfo = (newInfo) => {
    teacherInfo.value = { ...teacherInfo.value, ...newInfo };
  };

  const updatePhone = (newPhone) => {
    accountInfo.value.phone = newPhone;
  };

  const updateEmail = (newEmail) => {
    accountInfo.value.email = newEmail;
  };

  const updatePassword = (newPassword) => {
    // 这里实际应该调用API更新密码
    console.log('密码已更新:', newPassword);
  };

  const setMainCourse = (course) => {
    homeSettings.value.mainCourse = course;
  };

  const addFeaturedCourse = (course) => {
    if (!homeSettings.value.featuredCourses.some(c => c.id === course.id)) {
      homeSettings.value.featuredCourses.push(course);
    }
  };

  const removeFeaturedCourse = (courseId) => {
    homeSettings.value.featuredCourses = homeSettings.value.featuredCourses.filter(c => c.id !== courseId);
  };

  return {
    accountInfo,
    teacherInfo,
    homeSettings,
    encryptedPhone,
    encryptedEmail,
    updateTeacherInfo,
    updatePhone,
    updateEmail,
    updatePassword,
    setMainCourse,
    addFeaturedCourse,
    removeFeaturedCourse
  };
});