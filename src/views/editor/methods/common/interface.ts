import { Animation, AbstractMesh, Mesh, Vector3 } from "@babylonjs/core"

export type NumberArray = [number, number, number]
export type DynamicObject = Record<
  string,
  {
    name: string
    fileName?: string
    fileType?: string
    position: NumberArray
    rotate?: NumberArray
    scaling?: NumberArray | number
    visible?: boolean
  }
>

export interface AnimationItem {
  animation: Animation
  mesh: AbstractMesh
}
export interface AnimationKey {
  frame: number
  value: number | number[] | Vector3
}

export type ModelsType = Record<
  string,
  {
    position?: NumberArray
    rotation?: NumberArray
    scaling?: NumberArray
    visible?: boolean
  }
>

// 点击模式：modelName为字符串，对应onClick方法
// 拖拽模式：modelName为数组形式，对应onDrop方法
export interface AnimationStep {
  models: ModelsType
  interactions?: {
    modelName?: string | string[]
    onClick?: () => Promise<void>
    onDrop?: (draggedMesh: AbstractMesh | Mesh, targetMesh: AbstractMesh | Mesh | null) => Promise<void>
    animations?: AnimationItem[]
    animationRange?: [number, number]
    autoJumpNext?: boolean
  }[]

  onEnter?: () => Promise<void>
  onEnd?: () => Promise<void>
  onExit?: () => Promise<void>
}
