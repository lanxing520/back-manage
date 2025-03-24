<template>
  <el-form :model="formData" label-width="120px">
    <el-form-item
      v-for="(field, index) in formFields"
      :key="index"
      :label="field.label"
      :prop="field.prop"
    >
      <!-- Input 框 -->
      <el-input
        v-if="field.type === 'input'"
        v-model="formData[field.prop]"
        :placeholder="field.placeholder || '请输入'"
      />

      <!-- 单选框 -->
      <el-radio-group v-else-if="field.type === 'radio'" v-model="formData[field.prop]">
        <el-radio v-for="option in field.options" :key="option.value" :label="option.value">
          {{ option.label }}
        </el-radio>
      </el-radio-group>

      <!-- 复选框 -->
      <el-checkbox-group v-else-if="field.type === 'checkbox'" v-model="formData[field.prop]">
        <el-checkbox v-for="option in field.options" :key="option.value" :label="option.value">
          {{ option.label }}
        </el-checkbox>
      </el-checkbox-group>

      <!-- 下拉选项 -->
      <el-select
        v-else-if="field.type === 'select'"
        v-model="formData[field.prop]"
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
        v-model="formData[field.prop]"
        :format="field?.format ?? 'YYYY-MM-DD'"
        :type="field.type"
        :placeholder="field.placeholder || '请选择'"
      ></el-date-picker>
      <!-- 文件上传 -->
      <el-upload
        v-else-if="field.type === 'upload'"
        v-model:file-list="formData[field.prop]"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="field.limit || 3"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>

    <!-- 提交按钮 -->
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  props: {
    // 表单字段配置
    formFields: {
      type: Array,
      required: true,
    },
    // 表单数据
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 提交表单
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    // 重置表单
    onReset() {
      this.$emit('reset')
    },
    // 文件上传超出限制
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 ${fileList.length} 个文件`)
    },
  },
}
</script>

<style scoped>
.el-form {
  /* margin: 0 auto; */
}
</style>
