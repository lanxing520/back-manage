<template>
  <el-form
    ref="ruleFormRef"
    :model="ownFormData"
    :label-width="props?.labelWidth ?? 'auto'"
    :rules="props.rules"
    v-bind="$attrs"
  >
    <el-form-item
      v-for="(field, index) in props.formFields"
      :key="index"
      :label="field.label"
      :prop="field.prop"
    >
      <template v-if="props.model === 'readOnly'">{{ ownFormData[field.prop] }}</template>
      <template v-else>
        <!-- Input 框 -->
        <el-input
          v-if="field.type === 'input' || field.type === 'textarea'"
          :rows="field.rows"
          :type="field.type"
          v-model="ownFormData[field.prop]"
          :placeholder="field.placeholder || '请输入'"
        />

        <!-- 单选框 -->
        <el-radio-group v-else-if="field.type === 'radio'" v-model="ownFormData[field.prop]">
          <el-radio v-for="option in field.options" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>

        <!-- 复选框 -->
        <el-checkbox-group v-else-if="field.type === 'checkbox'" v-model="ownFormData[field.prop]">
          <el-checkbox v-for="option in field.options" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-checkbox>
        </el-checkbox-group>

        <!-- 下拉选项 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="ownFormData[field.prop]"
          :placeholder="field.placeholder || '请选择'"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-date-picker
          v-else-if="field.type === 'datetime' || field.type === 'date'"
          v-model="ownFormData[field.prop]"
          :format="field?.format ?? 'YYYY-MM-DD HH:mm'"
          :type="field.type"
          :placeholder="field.placeholder || '请选择'"
        ></el-date-picker>
        <!-- 文件上传 -->
        <el-upload
          v-else-if="field.type === 'upload'"
          action="#"
          :limit="field.limit || 3"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">点击上传</el-button>
        </el-upload>

        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="ownFormData[field.prop]"
          :placeholder="field.placeholder || '请输入数字'"
        />

        <!-- 自定义插槽 -->
        <slot v-else-if="field.slotName" :name="field.slotName"></slot>
      </template>
    </el-form-item>
  </el-form>
  <div v-if="props.showReset || props.showSubmit" class="bottom-button">
    <el-button v-if="props.showReset" @click="resetForm">重置</el-button>
    <el-button v-if="props.showSubmit" type="primary" @click="submitForm">{{
      props.submitText ?? '提交'
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { FormField } from '@/types/form-field'

interface Props {
  formFields: FormField[]
  formData: Record<string, any>
  labelWidth?: string
  rules?: FormRules
  showSubmit?: boolean
  submitText?: string
  showReset?: boolean
  model?: 'readOnly' | 'edit' | 'create'
}

const props = withDefaults(defineProps<Props>(), {
  showSubmit: false,
  showReset: false,
  submitText: '提交',
  labelWidth: 'auto',
  model: 'edit'
})
const ownFormData = ref(cloneDeep(props.formData))

const emit = defineEmits<{
  (e: 'submit', formData: any): void
  (e: 'reset'): void
  (e: 'data-change', formData: any): void
}>()
const ruleFormRef = ref<FormInstance | null>(null)

const submitForm = async (): Promise<void> => {
  if (!ruleFormRef.value) return
  
  try {
    const isValid = await ruleFormRef.value.validate()
    if (isValid) {
      emit('submit', ownFormData.value)
    }
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const resetForm = () => {
  if (!ruleFormRef.value) return
  ownFormData.value = cloneDeep(props.formData)
  emit('reset')
}

// 文件上传超出限制
function handleExceed(files: File[], fileList: File[]) {
  ElMessage.warning(`最多上传 ${fileList.length} 个文件`)
}

watch(
  () => ownFormData.value,
  (newVal) => {
    emit('data-change', newVal)
  },
  { deep: true, immediate: true }
)

defineExpose({ resetForm })
</script>

<style lang="scss" scoped>
.bottom-button {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2em;
}
</style>
