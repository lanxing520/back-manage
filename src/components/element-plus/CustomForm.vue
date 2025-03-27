<template>
  <el-form ref="ruleFormRef" :model="ownFormData" label-width="120px" :rules="props.rules">
    <el-form-item
      v-for="(field, index) in props.formFields"
      :key="index"
      :label="field.label"
      :prop="field.prop"
    >
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
        :format="field?.format ?? 'YYYY-MM-DD'"
        :type="field.type"
        :placeholder="field.placeholder || '请选择'"
      ></el-date-picker>
      <!-- 文件上传 -->
      <el-upload
        v-else-if="field.type === 'upload'"
        v-model:file-list="ownFormData[field.prop]"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="field?.limit || 1000"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
  <div class="bottom-button">
    <el-button v-if="props.showReset" @click="resetForm(ruleFormRef)">重置</el-button>
    <el-button v-if="props.showSubmit" type="primary" @click="submitForm(ruleFormRef)"
      >提交</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash'
import type { FormRules, FormInstance } from 'element-plus'

interface Field {
  label: string
  prop: string
  type: string
  placeholder?: string
  format?: string //'YYYY-MM-DD HH:mm'
  limit?: number
  rows?: number
  options?: { label: string; value: string }[]
}

const props = defineProps<{
  formFields: Field[]
  formData: Record<string, any>
  rules?: FormRules<Record<string, any>>
  showSubmit?: Boolean
  showReset?: Boolean
}>()
const ownFormData = ref(cloneDeep(props.formData))

const emit = defineEmits(['submit', 'reset'])
const ruleFormRef = useTemplateRef('ruleFormRef')

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('submit', ownFormData)
    } else {
      // console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  ownFormData.value = ref(cloneDeep(props.formData))
}

// 文件上传超出限制
function handleExceed(files, fileList) {
  this.$message.warning(`最多上传 ${fileList.length} 个文件`)
}
</script>

<style lang="scss" scoped>
.el-form {
  /* margin: 0 auto; */
}
.bottom-button {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2em;
}
</style>
