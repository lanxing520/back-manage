<template>
  <div class="custom-table-container">
    <!-- 表格顶部操作区 -->
    <div v-if="showHeader" class="table-header">
      <div class="header-left">
        <slot name="header-left">
          <h3 v-if="title">{{ title }}</h3>
        </slot>
      </div>
      <div class="header-right">
        <slot name="header-right">
          <el-button
            v-for="(btn, index) in headerButtons"
            :key="index"
            :icon="btn.icon"
            @click="btn.onClick"
          >
            {{ btn.label }}
          </el-button>
        </slot>
      </div>
    </div>

    <!-- Element Table 组件 -->
    <el-table
      v-bind="tableProps"
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选列 -->
      <el-table-column v-if="showSelection" type="selection" width="55" align="center" />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel"
        width="80"
        align="center"
      />

      <!-- 动态列 -->
      <el-table-column
        v-bind="column"
        :prop="column.prop"
        :label="column.label"
        :align="column?.align || 'left'"
        v-for="column in columns"
        :key="column.prop"
      >
        <template #default="scope">
          <slot :name="column.prop" :row="scope.row">
            {{ scope.row[column.prop] }}
          </slot>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="showOperation"
        :label="operationColumn.label || '操作'"
        :width="operationColumn.width || '180'"
        :align="operationColumn.align || 'center'"
        :fixed="operationColumn.fixed"
      >
        <template #default="scope">
          <slot name="operation" :row="scope.row">
            <el-button
              v-for="(btn, index) in operationColumn.buttons"
              :key="index"
              :icon="btn.icon"
              :disabled="btn.disabled && btn.disabled(scope.row)"
              @click="btn.onClick(scope.row)"
              type="primary"
            >
              {{ btn.label }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div v-if="showPagination" class="pagination-container">
      <el-pagination
        v-bind="paginationProps"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'

// 定义按钮类型
interface TableButton {
  label: string
  type?: string
  size?: string
  icon?: any
  disabled?: (row: any) => boolean
  onClick: (row?: any) => void
}

// 定义列类型
interface TableColumn extends Partial<TableColumnCtx<any>> {
  prop: string
  label: string
  // formatter?: (row: any, column: TableColumn) => string
}

// 定义操作列配置
interface OperationColumn {
  label?: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  buttons?: TableButton[]
}

// 定义分页配置
interface PaginationConfig {
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  layout?: string
  background?: boolean
}

// Props 定义
const props = withDefaults(
  defineProps<{
    // 表格数据
    data: any[]
    // 表格列配置
    columns: TableColumn[]
    // 表格标题
    title?: string
    // 是否显示表格顶部区域
    showHeader?: boolean
    // 是否显示多选列
    showSelection?: boolean
    // 是否显示序号列
    showIndex?: boolean
    // 序号列标题
    indexLabel?: string
    // 是否显示操作列
    showOperation?: boolean
    // 操作列配置
    operationColumn?: OperationColumn
    // 顶部按钮配置
    headerButtons?: TableButton[]
    // 是否显示分页
    showPagination?: boolean
    // 分页配置
    paginationConfig?: PaginationConfig
    // 加载状态
    loading?: boolean
    // 其他 Element Table 属性
    tableProps?: Record<string, any>
  }>(),
  {
    title: '',
    showHeader: true,
    showSelection: false,
    showIndex: false,
    indexLabel: '序号',
    showOperation: false,
    operationColumn: () => ({
      label: '操作',
      width: '180',
      align: 'center',
      buttons: [],
    }),
    headerButtons: () => [],
    showPagination: false,
    paginationConfig: () => ({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper',
      background: true,
    }),
    loading: false,
    tableProps: () => ({}),
  },
)

// Emits 定义
const emit = defineEmits([
  'selection-change',
  'size-change',
  'current-change',
  'update:paginationConfig',
])

// 计算属性 - 表格数据
const tableData = computed(() => props.data)

// 计算属性 - 分页配置
const paginationProps = computed(() => ({
  ...props.paginationConfig,
  currentPage: props.paginationConfig.currentPage,
  pageSize: props.paginationConfig.pageSize,
  total: props.paginationConfig.total,
  pageSizes: props.paginationConfig.pageSizes,
  layout: props.paginationConfig.layout,
  background: props.paginationConfig.background,
}))

// 多选变化事件
const handleSelectionChange = (val: any[]) => {
  emit('selection-change', val)
}

// 每页条数变化
const handleSizeChange = (val: number) => {
  emit('size-change', val)
  emit('update:paginationConfig', {
    ...props.paginationConfig,
    pageSize: val,
  })
}

// 当前页变化
const handleCurrentChange = (val: number) => {
  emit('current-change', val)
  emit('update:paginationConfig', {
    ...props.paginationConfig,
    currentPage: val,
  })
}

// 暴露方法给父组件
defineExpose({
  getSelections: () => {
    // 这里可以通过 ref 获取选中的行
    // 实际实现可能需要结合具体的表格实例
    return []
  },
})
</script>

<style scoped>
.custom-table-container {
  width: 100%;
  box-sizing: border-box;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.header-right {
  display: flex;
  gap: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.el-button + .el-button {
  margin-left: 8px;
}

:deep(.el-table) {
  width: 100%;
}

:deep(.el-table__header) th {
  background-color: #f5f7fa;
  color: #303133;
  font-weight: bold;
}
</style>
