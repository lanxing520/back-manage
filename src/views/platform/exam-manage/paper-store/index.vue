<template>
  <div class="paper-store content-wrapper">
    <BlockWrapper title="试卷库">
      <CustomForm :form-data="search" :form-fields="searchFields" :inline="true" />
      <div class="paper-list-wrapper">
        <div class="paper-item" v-for="(item,i) in paperList" :key="i">
          <div class="left">
            <h2 class="title">{{ item.title }}</h2>
            <div>
              <span>
                题量:<span class="m-l">{{ item.questionNumber }}</span>题,
                难易:<span class="m-l">{{ item.difficulty }}</span>,
                分类:<span class="m-l">{{ item.category }}</span>,
                总分:<span class="m-l">{{ item.totalPoints }}</span>分,
                上次更新:<span class="m-l">{{ item.lastRenew }}</span>,
              </span>
            </div>
          </div>
          <div class="right">
            <div class="botton-group"></div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  </div>
</template>
<script setup>
import BlockWrapper from '../../components/BlockWrapper.vue';
import CustomForm from '@/components/element-plus/CustomForm.vue';

const search = ref({difficulty:'', category:'', search:'',})
const searchFields = ref([
  {label:'难易度',prop:'difficulty',type:'select',options:[{label:'x',value:'x'}]},
  {label:'所属分类',prop:'category',type:'select',options:[{label:'x',value:'x'}]},
  {label:'',prop:'search',type:'input'},
])

const paperList = ref([
  {
    title:'低压电器',
    questionNumber:11,
    difficulty:'易',
    category:'',
    totalPoints:55,
    lastRenew:'2024-05-22 14:00:00'
  }
  ])
</script>
<style lang="scss" scoped>
.paper-store {
  :deep(.el-form){
    .el-select{
      width: 200px;
    }
  }

  .m-l{
    margin-left: 10px;
  }
  .paper-list-wrapper{
    .paper-item{
      display: flex;
      align-items: center;
      border: 1px solid #aeaeae;
      padding: 0.5rem 1rem;
      .left{
.title{
  margin-bottom: 10px;
}
      }
    }
  }
}
</style>
