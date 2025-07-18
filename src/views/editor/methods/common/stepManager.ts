import { AbstractMesh, AnimationGroup, Vector3, Mesh } from "@babylonjs/core/Legacy/legacy"
import { addHighlight, removeHighlight, click, showMeshes } from "./action"
import { createAnimeGroup } from "./animation"
import { AdvancedMeshDragger } from "./meshDragger"
import type { AnimationStep } from "./interface"
import { experimentScore } from "@/stores/experimentStore"
import { formatDate } from "@/utils/timer"

const store = experimentScore()
export const stepIndex = ref(1)
export const isFinished = ref(false)

export let dragger: AdvancedMeshDragger | null = null

export class AnimationStepManager {
  private steps: AnimationStep[] = []
  private currentStepIndex = 0
  private modelInstances: Record<string, AbstractMesh[]> = {}
  private animationGroups: Record<string, AnimationGroup> = {}
  private activeAnimations: AnimationGroup[] = []

  // private stepState: Record<number, any> = {}

  // 新增计分系统相关属性
  private stepScores: {
    startTime: string
    endTime: string
    score: number
    maxScore: number
    repeatCount: number
  }[] = []
  private totalScore = 100
  constructor() {
    isFinished.value = false
  }

  // 注册模型
  registerModel(name: string, mesh: AbstractMesh[]) {
    this.modelInstances[name] = mesh
  }

  // 添加步骤
  addStep(step: AnimationStep) {
    this.steps.push(step)
    this.stepScores.push({
      startTime: "",
      endTime: "",
      score: 0,
      maxScore: 0, // 分配分数
      repeatCount: 1,
    })
  }
  // 跳转到指定步骤
  async goToStep(targetIndex = stepIndex.value - 1) {
    if (targetIndex < 0 || targetIndex >= this.steps.length) return

    if (this.stepScores[this.currentStepIndex]) {
      this.stepScores[this.currentStepIndex].startTime = formatDate(new Date())
    }

    // 停止当前所有动画
    this.stopAllAnimations()
    // 执行离开当前步骤的清理
    const currentStep = this.steps[this.currentStepIndex]
    if (
      currentStep &&
      typeof currentStep.onExit === "function" &&
      this.currentStepIndex !== targetIndex
    ) {
      await currentStep.onExit()
    }

    // 更新当前步骤索引
    this.currentStepIndex = targetIndex
    const targetStep = this.steps[targetIndex]

    // 初始化步骤状态
    // if (!this.stepState[targetIndex]) {
    //   this.stepState[targetIndex] = {}
    // }

    // 执行步骤进入逻辑
    if (targetStep.onEnter) {
      await targetStep.onEnter()
    }

    // 设置模型初始状态
    this.setupModelStates(targetStep)

    // 设置交互事件
    this.setupInteractions(targetStep)
  }
  // 新增方法：获取分数报告
  getScoreReport() {
    store.report = []
    this.stepScores.forEach((e, i) => {
      store.report.push({
        index: Number(i),
        ...e,
      })
    })
  }
  public reduceStepScore(index: number) {
    this.stepScores[index - 1].score--
  }
  // 在步骤完成时更新分数（示例）

  private stopAllAnimations() {
    this.activeAnimations.forEach((anim) => anim.stop())
    this.activeAnimations = []
  }

  private setupModelStates(step: AnimationStep) {
    // 设置模型可见性、位置等初始状态
    Object.keys(this.modelInstances).forEach((name) => {
      const model = this.modelInstances[name]
      model[0].setEnabled(step.models[name]?.visible ?? true)
    })

    // 应用模型初始位置/旋转等
    Object.entries(step.models).forEach(([name, config]) => {
      const model = this.modelInstances[name]
      if (!model) return

      if (config.position) model[0].position = Vector3.FromArray(config.position)
      if (config.rotation) model[0].rotation = Vector3.FromArray(config.rotation)
      if (config.scaling) model[0].scaling = Vector3.FromArray(config.scaling)
      if (config?.visible !== undefined) showMeshes(model, config.visible)
    })
  }
  private async playAnimation(interaction: any, step: AnimationStep) {
    if (interaction.animations && interaction.animations.length) {
      const animGroup = createAnimeGroup(
        `step-${this.currentStepIndex}-${interaction.modelName}-ani`,
        interaction.animations,
      )

      if (interaction.animationRange && interaction.animationRange.length === 2) {
        animGroup.normalize(...interaction.animationRange)
      } else {
        animGroup.normalize(0)
      }

      animGroup.start()
      this.activeAnimations.push(animGroup)

      const observer = animGroup.onAnimationGroupEndObservable.add(async () => {
        observer.remove() // Clean up the observer
        if (step?.onEnd && typeof step.onEnd === "function") {
          try {
            await step.onEnd()
          } catch (error) {
            console.error("Error in step onEnd callback:", error)
          }
        }
        if (interaction.autoJumpNext === false) return
        try {
          await this.handleStepCompletion()
        } catch (error) {
          console.error("Error handling step completion:", error)
        }
      })
    } else {
      if (interaction.autoJumpNext === false) return 
      try {
        await this.handleStepCompletion()
      } catch (error) {
        console.error("Error handling step completion:", error)
      }
    }
  }
  private setupInteractions(step: AnimationStep) {
    // 清除旧的高亮和点击事件
    removeHighlight()
    if (dragger) dragger.dispose()
    // 设置新的交互
    step.interactions?.forEach((interaction) => {
      if (!interaction.modelName) {
        return
      }
      //点击模式
      if (typeof interaction.modelName === "string") {
        const mesh = this.modelInstances[interaction.modelName]
        if (!mesh) return

        // 添加高亮
        addHighlight(mesh as Mesh[])

        // 添加点击事件
        click(
          mesh as Mesh[],
          async () => {
            if (interaction.onClick) {
              await interaction.onClick()
            }
            // 执行关联动画
            this.playAnimation(interaction, step)
          },
          () => {
            this.stepScores[this.currentStepIndex].score--
            this.stepScores[this.currentStepIndex].repeatCount++
          },
        )
      } else {
        //拖拽模式
        const dragMeshes = this.modelInstances[interaction.modelName[0]] as Mesh[]
        const dropMeshes = this.modelInstances[interaction.modelName[1]] as Mesh[]
        addHighlight(dragMeshes)
        addHighlight(dropMeshes, [1, 246 / 255, 143 / 255])
        dragger = new AdvancedMeshDragger({
          canPickup: (mesh) => mesh.name === dragMeshes[0].name,
          canDropOn: (draggedMesh, targetMesh) =>
            targetMesh.name === dropMeshes[0].name && draggedMesh.name === dragMeshes[0].name,
          // 正确放置事件处理
          onDrop: async (draggedMesh, targetMesh) => {
            if (interaction.onDrop) await interaction.onDrop(draggedMesh, targetMesh)
            this.playAnimation(interaction, step)
          },
        })
        // dragger.setDragMesh(dragMeshName.value)
      }
    })
  }

  async handleStepCompletion() {
    // 可以根据完成情况调整分数
    // 例如：如果用户操作正确可以给满分，错误可以扣分
    this.stepScores[this.currentStepIndex].endTime = formatDate(new Date())
    if (this.currentStepIndex === this.steps.length - 1) {
      this.finish()
    } else {
      this.currentStepIndex++
      stepIndex.value++
      await this.goToStep(this.currentStepIndex)
    }
  }

  public finish() {
    this.getScoreReport()
    isFinished.value = true
  }

  dispose() {
    // 停止并释放所有激活的动画组
    this.stopAllAnimations()
    this.activeAnimations.forEach((animGroup) => {
      animGroup.dispose()
    })
    this.activeAnimations = []

    // 清除动画组缓存
    Object.values(this.animationGroups).forEach((animGroup) => {
      animGroup.dispose()
    })
    this.animationGroups = {}

    // 移除所有模型引用
    this.modelInstances = {}

    // 清空步骤列表
    this.steps = []

    // 移除高亮和交互
    removeHighlight() // 假设这个函数可以安全调用多次
  }
}
