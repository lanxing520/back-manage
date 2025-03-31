<template>
  <div class="course-manager">
    <div class="course-list">
      <div
        v-for="(chapter, chapterIndex) in chapters"
        :key="chapter.id"
        class="chapter-item"
        :class="{
          dragging:
            dragState.active && dragState.type === 'chapter' && dragState.index === chapterIndex,
        }"
        draggable="true"
        @dragstart="handleChapterDragStart($event, chapterIndex)"
        @dragover.prevent="handleChapterDragOver($event, chapterIndex)"
        @dragenter.prevent="handleDragEnter($event)"
        @dragleave="handleDragLeave($event)"
        @drop="handleChapterDrop($event, chapterIndex)"
        @dragend="handleDragEnd"
      >
        <div class="chapter-header">
          <span class="chapter-number">第{{ chapterIndex + 1 }}阶段</span>

          <template v-if="chapter.editing">
            <input
              v-model="chapter.name"
              @blur="saveEdit(chapter)"
              @keyup.enter="saveEdit(chapter)"
              ref="chapterEditInputs"
              class="edit-input"
            />
          </template>
          <template v-else>
            <span class="chapter-name" @click="startEdit(chapter)">{{ chapter.name }}</span>
          </template>

          <button @click.stop="addSection(chapterIndex)" class="add-btn">+ 小节</button>
          <el-icon @click.stop="removeChapter(chapterIndex)" class="remove-btn"><Delete /></el-icon>
        </div>

        <div class="section-list">
          <div
            v-for="(section, sectionIndex) in chapter.sections"
            :key="section.id"
            class="section-item"
            :class="{
              dragging:
                dragState.active &&
                dragState.type === 'section' &&
                dragState.index === sectionIndex &&
                dragState.parentIndex === chapterIndex,
            }"
            draggable="true"
            @dragstart.stop="handleSectionDragStart($event, chapterIndex, sectionIndex)"
            @dragover.prevent.stop="handleSectionDragOver($event, chapterIndex, sectionIndex)"
            @dragenter.prevent.stop="handleDragEnter($event)"
            @dragleave.stop="handleDragLeave($event)"
            @drop.stop="handleSectionDrop($event, chapterIndex, sectionIndex)"
            @dragend.stop="handleDragEnd"
          >
            <span class="section-number">{{ chapterIndex + 1 }}.{{ sectionIndex + 1 }}</span>

            <template v-if="section.editing">
              <input
                v-model="section.name"
                @blur="saveEdit(section)"
                @keyup.enter="saveEdit(section)"
                ref="sectionEditInputs"
                class="edit-input"
              />
            </template>
            <template v-else>
              <span class="section-name" @click.stop="startEdit(section)">{{ section.name }}</span>
            </template>
            <img src="@assets/img/platform/subject/teacher.png" @click="teacherClick" alt="" />
            <el-icon @click.stop="removeSection(chapterIndex, sectionIndex)" class="remove-btn"
              ><Delete
            /></el-icon>
          </div>
        </div>
      </div>

      <!-- <button @click="addChapter" class="add-chapter-btn"><span>+</span> 添加新章</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface Section {
  id: number
  name: string
  editing: boolean
}

interface Chapter {
  id: number
  name: string
  sections: Section[]
  editing: boolean
}

interface DragState {
  active: boolean
  type: 'chapter' | 'section' | null
  index: number
  parentIndex: number
  data: Chapter | Section | null
}

// 数据
const chapters = ref<Chapter[]>([])
const nextId = ref(1)
const chapterEditInputs = ref<HTMLInputElement[]>([])
const sectionEditInputs = ref<HTMLInputElement[]>([])

const teacherClick = () => {}

// 拖拽状态
const dragState = reactive<DragState>({
  active: false,
  type: null,
  index: -1,
  parentIndex: -1,
  data: null,
})

// 添加新章
const addChapter = () => {
  chapters.value.push({
    id: nextId.value++,
    name: `新章节 ${chapters.value.length + 1}`,
    sections: [],
    editing: false,
  })
}

// 添加小节
const addSection = (chapterIndex: number) => {
  const chapter = chapters.value[chapterIndex]
  chapter.sections.push({
    id: nextId.value++,
    name: `新小节 ${chapter.sections.length + 1}`,
    editing: false,
  })
}

// 删除章
const removeChapter = (index: number) => {
  chapters.value.splice(index, 1)
}

// 删除小节
const removeSection = (chapterIndex: number, sectionIndex: number) => {
  chapters.value[chapterIndex].sections.splice(sectionIndex, 1)
}

// 开始编辑
const startEdit = (item: Chapter | Section) => {
  item.editing = true
  nextTick(() => {
    const inputs = item.hasOwnProperty('sections')
      ? chapterEditInputs.value
      : sectionEditInputs.value
    if (inputs && inputs.length > 0) {
      const lastInput = inputs[inputs.length - 1]
      lastInput.focus()
      lastInput.select()
    }
  })
}

// 保存编辑
const saveEdit = (item: Chapter | Section) => {
  item.editing = false
  if (!item.name.trim()) {
    item.name = item.name.trim() || '未命名'
  }
}

// 章节拖拽开始
const handleChapterDragStart = (event: DragEvent, index: number) => {
  dragState.active = true
  dragState.type = 'chapter'
  dragState.index = index
  dragState.parentIndex = -1
  dragState.data = chapters.value[index]

  event.dataTransfer?.setData('text/plain', '')
  event.dataTransfer!.effectAllowed = 'move'
}

// 章节拖拽经过
const handleChapterDragOver = (event: DragEvent, index: number) => {
  if (dragState.type !== 'chapter') return

  const target = event.currentTarget as HTMLElement
  target.classList.remove('drag-above', 'drag-below')

  const rect = target.getBoundingClientRect()
  const middle = rect.top + rect.height / 2

  if (event.clientY < middle) {
    target.classList.add('drag-above')
  } else {
    target.classList.add('drag-below')
  }
}

// 小节拖拽开始
const handleSectionDragStart = (event: DragEvent, chapterIndex: number, sectionIndex: number) => {
  dragState.active = true
  dragState.type = 'section'
  dragState.index = sectionIndex
  dragState.parentIndex = chapterIndex
  dragState.data = chapters.value[chapterIndex].sections[sectionIndex]

  event.dataTransfer?.setData('text/plain', '')
  event.dataTransfer!.effectAllowed = 'move'

  // 阻止事件冒泡到章节元素
  event.stopPropagation()
}

// 小节拖拽经过
const handleSectionDragOver = (event: DragEvent, chapterIndex: number, sectionIndex: number) => {
  if (dragState.type !== 'section' || dragState.parentIndex !== chapterIndex) return

  const target = event.currentTarget as HTMLElement
  target.classList.remove('drag-above', 'drag-below')

  const rect = target.getBoundingClientRect()
  const middle = rect.top + rect.height / 2

  if (event.clientY < middle) {
    target.classList.add('drag-above')
  } else {
    target.classList.add('drag-below')
  }

  // 阻止事件冒泡到章节元素
  event.stopPropagation()
}

// 拖拽进入
const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
}

// 拖拽离开
const handleDragLeave = (event: DragEvent) => {
  ;(event.currentTarget as HTMLElement).classList.remove('drag-above', 'drag-below')
}

// 拖拽结束
const handleDragEnd = () => {
  dragState.active = false
  dragState.type = null
  dragState.index = -1
  dragState.parentIndex = -1
  dragState.data = null
}

// 章节放置
const handleChapterDrop = (event: DragEvent, index: number) => {
  const target = event.currentTarget as HTMLElement
  target.classList.remove('drag-above', 'drag-below')

  if (dragState.type !== 'chapter') return

  const rect = target.getBoundingClientRect()
  const middle = rect.top + rect.height / 2
  const newIndex = event.clientY < middle ? index : index + 1

  moveChapter(dragState.index, newIndex)
}

// 小节放置
const handleSectionDrop = (event: DragEvent, chapterIndex: number, sectionIndex: number) => {
  const target = event.currentTarget as HTMLElement
  target.classList.remove('drag-above', 'drag-below')

  if (dragState.type !== 'section' || dragState.parentIndex !== chapterIndex) return

  const rect = target.getBoundingClientRect()
  const middle = rect.top + rect.height / 2
  const newIndex = event.clientY < middle ? sectionIndex : sectionIndex + 1

  moveSection(chapterIndex, dragState.index, newIndex)

  // 阻止事件冒泡到章节元素
  event.stopPropagation()
}

// 移动章
const moveChapter = (fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex || toIndex - 1 === fromIndex) return

  const chapter = chapters.value[fromIndex]
  chapters.value.splice(fromIndex, 1)

  const adjustedToIndex = toIndex > fromIndex ? toIndex - 1 : toIndex
  chapters.value.splice(adjustedToIndex, 0, chapter)
}

// 移动小节
const moveSection = (chapterIndex: number, fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex || toIndex - 1 === fromIndex) return

  const chapter = chapters.value[chapterIndex]
  const section = chapter.sections[fromIndex]
  chapter.sections.splice(fromIndex, 1)

  const adjustedToIndex = toIndex > fromIndex ? toIndex - 1 : toIndex
  chapter.sections.splice(adjustedToIndex, 0, section)
}

// 初始化示例数据
addChapter()
addSection(0)
chapters.value[0].sections.push({
  id: nextId.value++,
  name: '课程介绍',
  editing: false,
})
addChapter()

defineExpose({ addChapter })
</script>

<style scoped lang="scss">
.course-manager {
  /* max-width: 800px; */
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 24px;
}

.course-list {
  margin-top: 20px;
}

.chapter-item {
  /*  */
  line-height: 3em;
  font-size: 16px;
  margin-bottom: 12px;

  .chapter-header {
    padding-left: 5%;
    padding-right: 2%;
    border-bottom: 1px dashed #aeaeae;
    height: 3em;
  }
}
.section-item {
  /* height: 2em; */
  line-height: 2em;
  border-bottom: 1px dashed #aeaeae;
  font-size: 16px;
  margin-bottom: 12px;
  padding-left: 10%;
  padding-right: 2%;
}

.chapter-item {
  /* border-left: 4px solid #3498db; */
}

.chapter-header,
.section-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-number,
.section-number {
  font-weight: bold;
  color: #555;
  flex-shrink: 0;
}

.chapter-name,
.section-name {
  flex-grow: 1;
  cursor: pointer;
  padding: 0 8px;
  transition: background-color 0.2s;
}

.chapter-name:hover,
.section-name:hover {
  background-color: #e9ecef;
  border-radius: 4px;
}

.edit-input {
  flex-grow: 1;
  padding: 6px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: inherit;
}

.edit-input:focus {
  outline: none;
  border-color: #3498db;
  // box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.add-btn,
.add-chapter-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.add-btn {
  background-color: transparent;
  color: #aeaeae;
  border-radius: 15px;
  padding: 0 20px;
  border: 1px solid #aeaeae;
}

.remove-btn {
  cursor: pointer;
}

// .remove-btn:hover {
//   background-color: #c0392b;
// }

.add-chapter-btn {
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
}

.add-chapter-btn:hover {
  background-color: #2980b9;
}

.add-chapter-btn span {
  font-size: 20px;
}

.drag-above {
  border-top: 2px dashed #3498db;
  padding-top: 10px;
}

.drag-below {
  border-bottom: 2px dashed #3498db;
  padding-bottom: 10px;
}

.dragging {
  opacity: 0.5;
}

.section-list {
  margin-top: 10px;
}
.dragging {
  opacity: 0.5;
  background-color: #e9ecef;
}

.drag-above {
  border-top: 2px dashed #3498db;
  padding-top: 10px;
  margin-top: 4px;
}

.drag-below {
  border-bottom: 2px dashed #3498db;
  padding-bottom: 10px;
  margin-bottom: 4px;
}

/* 防止拖拽时选中文本 */
.chapter-item,
.section-item {
  user-select: none;
}

/* 按钮点击效果 */
button:active {
  transform: scale(0.98);
}
</style>
