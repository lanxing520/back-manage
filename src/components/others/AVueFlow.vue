<template>
  <div class="avue-flow-container">
    <div class="controls">
      <el-button @click="addNode" type="primary" size="small">
        <el-icon><Plus /></el-icon> 添加节点
      </el-button>
      <el-button @click="saveFlow" type="success" size="small">
        <el-icon><Download /></el-icon> 保存流程图
      </el-button>
      <el-button @click="fitView" type="info" size="small">
        <el-icon><FullScreen /></el-icon> 适应视图
      </el-button>
    </div>
    <!-- 节点样式编辑器 -->
    <div v-if="selectedNode" class="style-editor">
      <h4>编辑节点</h4>
      <el-form label-width="80px">
        <el-form-item label="文本内容">
          <el-input v-model="selectedNode.label" />
        </el-form-item>

        <el-form-item label="字体大小">
          <!-- <el-input v-model="selectedNode.style.fontSize" /> -->
          <el-input-number
            :model-value="parseInt(selectedNode.style.fontSize)"
            @update:model-value="(newValue) => (selectedNode.style.fontSize = newValue + 'px')"
          />
        </el-form-item>

        <el-form-item label="字体颜色">
          <el-color-picker v-model="selectedNode.style.color" />
        </el-form-item>

        <el-form-item label="背景颜色">
          <el-color-picker v-model="selectedNode.style.backgroundColor" />
        </el-form-item>

        <el-form-item label="边框颜色">
          <el-color-picker v-model="selectedNode.style.borderColor" />
        </el-form-item>

        <el-form-item v-if="selectedNode.data.imageUrl" label="图片URL">
          <el-input v-model="selectedNode.data.imageUrl" />
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="deleteNode(selectedNode)">
            <el-icon><Delete /></el-icon> 删除节点
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 边编辑面板 -->
    <div v-if="selectedEdge" class="edge-editor">
      <h4>边编辑</h4>
      <el-form label-width="80px">
        <el-form-item label="标签文本">
          <el-input v-model="selectedEdge.label" />
        </el-form-item>
        <el-form-item label="标签字号">
          <el-input-number
            :model-value="parseInt(selectedEdge.labelStyle.fontSize)"
            @update:model-value="(newValue) => (selectedEdge.labelStyle.fontSize = newValue + 'px')"
          />
        </el-form-item>
        <el-form-item label="标签字体色">
          <el-color-picker v-model="selectedEdge.labelStyle.fill" />
        </el-form-item>
        <el-form-item label="标签背景色">
          <el-color-picker v-model="selectedEdge.labelBgStyle.fill" />
        </el-form-item>
        <el-form-item label="线条颜色">
          <el-color-picker v-model="selectedEdge.style.stroke" />
        </el-form-item>
        <el-form-item label="线条宽度">
          <el-input-number v-model="selectedEdge.style.strokeWidth" :min="1" :max="10" />
        </el-form-item>

        <!-- <el-form-item label="线条样式">
          <el-select v-model="selectedEdge.style.style">
            <el-option label="实线" value="solid" />
            <el-option label="虚线" value="dashed" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="danger" @click="removeEdge(selectedEdge.id)">
            <el-icon><Delete /></el-icon> 删除边
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <VueFlow
      v-model="elements"
      :nodes-draggable="true"
      :nodes-connectable="true"
      :zoom-on-double-click="false"
      :edges-updatable="true"
      @pane-ready="onPaneReady"
      @connect="onConnect"
      @node-click="onNodeClick"
      @edge-click="onEdgeClick"
      @edge-double-click="onEdgeDoubleClick"
      @edge-update="onEdgeUpdate"
    >
      <template #node-custom="props">
        <CustomNode :data="props.data" @remove="() => deleteNode(props)" />
      </template>
      <template #edge-custom="customEdgeProps">
        <CustomEdge v-bind="customEdgeProps" @remove="removeEdge(customEdgeProps.id)" />
      </template>
      <Controls />
      <Background pattern-color="#aaa" :gap="20" />
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { VueFlow, MarkerType, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'
import { Plus, Download, FullScreen } from '@element-plus/icons-vue'
import CustomNode from './nodes/CustomNode.vue'
import type { Node, Edge, Elements, Connection } from '@vue-flow/core'
import CustomEdge from './nodes/CustomEdge.vue'

import '@vue-flow/controls/dist/style.css'
// 定义节点和边的类型
interface FlowElement extends Elements {}
interface FlowNode extends Node {}
// interface FlowEdge extends Edge {}
interface EdgeData {
  label?: string
  color?: string
  width?: number
  style?: string
}
// 初始化一些节点和边
const initialElements: FlowElement = []
const selectedNode = ref<any>(null)
const elements = ref<FlowElement>(initialElements)
const selectedEdge = ref<any>(null)
const { fitView, addEdges, updateEdge } = useVueFlow()
// 当节点被点击时
const onNodeClick = (event: any) => {
  selectedEdge.value = null
  selectedNode.value = event.node
}
// 添加新节点
const addNode = () => {
  const newNode: FlowNode = {
    id: `${Date.now()}`,
    type: 'default',
    label: '新节点',
    position: { x: 100, y: 100 },
    data: {},
    style: { backgroundColor: '#fff', width: 2, color: '#000', borderColor: '#000' },
  }
  elements.value.push(newNode)
}
// 删除节点
const deleteNode = (node: any) => {
  elements.value = elements.value.filter((el) => el.id !== node.id)
  if (selectedNode.value?.id === node.id) {
    selectedNode.value = null
  }
}
// 删除边
const removeEdge = (id: string) => {
  elements.value = elements.value.filter((el) => el.id !== id)
  if (selectedEdge.value?.id === id) {
    selectedEdge.value = null
  }
}
// 保存流程图数据
const saveFlow = () => {
  const flowData = JSON.stringify(elements.value, null, 2)
  console.log('流程图数据:', flowData)
  // 这里可以添加实际保存逻辑，如API调用
  ElMessage.success('流程图数据已保存到控制台')
}

// 当画布准备好时
const onPaneReady = () => {
  fitView({ padding: 0.2 })
}

// 当连接创建时
const onConnect = (params: Connection) => {
  const newEdge: Edge = {
    id: `e${params.source}-${params.target}`,
    source: params.source!,
    target: params.target!,
    animated: false,
    markerEnd: MarkerType.Arrow,
    style: { stroke: '#10b981', strokeWidth: 2 },
    labelStyle: { fill: '#10b981', fontWeight: 700, fontSize: '18px' },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', fillOpacity: 0.7 },
    updatable: true,
  }
  addEdges([newEdge])
}
// 当边被点击时
const onEdgeClick = (event: any) => {
  selectedNode.value = null
  selectedEdge.value = event.edge as Edge<EdgeData>
}

// 当边被双击时
const onEdgeDoubleClick = (event: any) => {
  // const label = prompt('输入边标签', event.edge.data?.label || '')
  // if (label !== null) {
  //   event.edge.data = { ...event.edge.data, label }
  // }
}

function onEdgeUpdate({ edge, connection }) {
  updateEdge(edge, connection)
}
</script>

<style lang="scss">
/* 引入Vue Flow基础样式 */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.avue-flow-container {
  position: relative;
  width: 100%;
  height: 600px;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  .controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    display: flex;
    gap: 8px;
  }
  .style-editor {
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 8px;
  }
  .edge-editor {
    position: absolute;
    top: 20px;
    right: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 8px;
  }
}
</style>
