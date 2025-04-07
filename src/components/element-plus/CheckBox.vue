<template>
  <div class="">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
      全选
    </el-checkbox>
    <el-checkbox-group v-model="checkedItems" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in itemList" :key="item" :label="item?.label" :value="item.id">
        <slot :props="item">
          {{ item }}
        </slot>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'

type PropsType = {
  isCheckAll?: Boolean
  itemList: { id: string; [key: string]: any }[] // 必须有id
  defaultCheckedItems?: string[] //id 数组
}

const { isCheckAll = false, itemList } = defineProps<PropsType>()
const emit = defineEmits(['change'])
const checkAll = ref(isCheckAll)
const isIndeterminate = ref(true)

const checkedItems = ref<any[]>([])

watch(checkedItems.value, (newVal) => {
  emit('change', newVal)
})

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedItems.value = val ? itemList.map((e) => e.id) : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === itemList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < itemList.length
}
</script>
<style lang="scss" scoped></style>
