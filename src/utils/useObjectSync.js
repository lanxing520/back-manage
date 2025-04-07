// useObjectSync.js
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'

export function useObjectSync(props, emit, propName = 'modelValue') {
  // 深度克隆初始值
  const initialObj = ref(cloneDeep(props[propName]))
  // 创建响应式本地副本
  const localObj = ref(cloneDeep(props[propName]))

  // 自动同步修改到父组件
  watch(
    localObj,
    (newVal) => {
      emit(`update:${propName}`, cloneDeep(newVal))
    },
    { deep: true },
  )

  // 重置函数
  const resetToInitial = () => {
    localObj.value = cloneDeep(initialObj.value)
    emit(`update:${propName}`, cloneDeep(initialObj.value))
  }

  // 监听父组件变化
  watch(
    () => props[propName],
    (newVal) => {
      initialObj.value = cloneDeep(newVal)
      localObj.value = cloneDeep(newVal)
    },
    { deep: true },
  )

  return {
    localObj,
    initialObj,
    resetToInitial,
  }
}
