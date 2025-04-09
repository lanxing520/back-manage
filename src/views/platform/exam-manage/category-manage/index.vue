<template>
  <div class="category-manage">
    <BlockWrapper title="分类管理">
      <template #button>
        <div>
          <el-button type="primary" @click="showAdd">新增分类</el-button>
          <el-button type="primary" @click="deleteMore">批量删除</el-button>
        </div>
      </template>

      <CustomTable
        :data="tableData"
        :columns="tableColumns"
        @selection-change="handleSelectChange"
        show-selection
        show-operation
      >
        <template #category="{ row }">
          <span v-show="row.id !== editItem.id" @click="openEdit(row)">{{ row.category }}</span>
          <el-input v-show="row.id === editItem.id" v-model="editItem.value" @blur="onBlur" />
        </template>

        <template #operation="{ row }">
          <img
            class="delete-img"
            src="@img/platform/delete_icon.png"
            @click="onDelete(row)"
            alt=""
          />
        </template>
      </CustomTable>
    </BlockWrapper>
  </div>
  <el-dialog
    v-model="showAddCategoryDialog"
    align-center
    append-to-body
    title="新增分类"
    width="500px"
    @close="addCategory = ''"
  >
    <div class="space-between">
      <el-input v-model="addCategory" placeholder="请输入分类名称"></el-input>
      <el-button style="margin-left: 1rem" type="primary" @click="onAdd">确定</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import BlockWrapper from '../../components/BlockWrapper.vue'
import CustomTable from '@/components/element-plus/CustomTable.vue'

const tableData = ref([
  { id: '001', category: '水处理' },
  { id: '002', category: 'huahiadhuias理' },
])
const tableColumns = ref([
  {
    prop: 'category',
    label: '名称',
  },
])
const editItem = ref({ id: '', value: '' })
const openEdit = (row) => {
  editItem.value.id = row.id
  editItem.value.value = row.category
}
const onBlur = async () => {
  // await 去后端改值
  editItem.value.id = ''
  editItem.value.value = ''
  // await 更新table
}

const onDelete = async (row) => {
  console.log(row)
}
const deleteMore = async () => {}
const selectList = ref([])
const handleSelectChange = (val) => {
  selectList.value = val
  console.log(val)
}
const showAddCategoryDialog = ref(false)
const showAdd = () => {
  showAddCategoryDialog.value = true
}

const addCategory = ref('')
const onAdd = async () => {
  showAddCategoryDialog.value = false
  addCategory.value = ''
}
</script>
<style lang="scss" scoped>
.delete-img {
  cursor: pointer;
}
</style>
