import { createBezierPath } from "../common/curvePath"
import { createTubeMaterial, createTube } from "../common/action"
import { Mesh } from "@babylonjs/core"

//实验6 静脉输液通道
export class SyTube {
  private tube: Mesh
  private tube2: Mesh
  private material: any // 替换为实际的材质类型

  constructor() {
    const pathList = createBezierPath([
      [0.561, 1.278, -0.308],
      [0.57, 1.285, -0.306],
      [0.575, 1.295, -0.305],
      [0.58, 1.3, -0.35],
      [0.8, 1.3, -0.5],
      [1.1, 1.15, -0.5],
      [1.06, 1.08, 0.7],
    ])

    const pathList2 = createBezierPath([
      [1.1, 1.1, 0.2],
      [1.0, 1.15, 0.2],
      [1.0, 1.45, 0.2],
    ])

    this.tube = createTube(pathList, 0.001)
    this.tube2 = createTube(pathList2, 0.001)

    this.material = createTubeMaterial()
    if (this.material) {
      this.tube.material = this.material
      this.tube2.material = this.material
    }
  }

  public show(visible: boolean): void {
    if (this.tube) this.tube.isVisible = visible
    if (this.tube2) this.tube2.isVisible = visible
  }

  // 可选：添加获取管道的访问器方法
  public getTube(): Mesh {
    return this.tube
  }

  public getTube2(): Mesh {
    return this.tube2
  }

  // 可选：添加销毁方法
  public dispose(): void {
    if (this.tube) this.tube.dispose()
    if (this.tube2) this.tube2.dispose()
    if (this.material) this.material.dispose()
  }
}

// 实验3 救治输液通道
export class SyTube2 {
  private tube: Mesh

  private material: any // 替换为实际的材质类型

  constructor() {
    const pathList = createBezierPath([
      [0.731, 1.163, -0.209],
      [0.731, 1.18, -0.1],
      [0.731, 1.2, 0],
      [0.731, 1.5, 0],
    ])

    this.tube = createTube(pathList, 0.001)

    this.material = createTubeMaterial()
    if (this.material) {
      this.tube.material = this.material
    }
  }

  public show(visible: boolean): void {
    if (this.tube) this.tube.isVisible = visible
  }

  // 可选：添加获取管道的访问器方法
  public getTube(): Mesh {
    return this.tube
  }

  // 可选：添加销毁方法
  public dispose(): void {
    if (this.tube) this.tube.dispose()
    if (this.material) this.material.dispose()
  }
}

// 实验准备,充管排气
export class cgpqTube {
  private tube: Mesh
  private material: any // 替换为实际的材质类型

  constructor() {
    const pathList = createBezierPath([
      [0.1, 1.45, -0.02],
      [0.1, 1.5, -0.02],
      [0.1, 1.5, 0.1],
      [0.1, 1.2, 0.1],
    ])

    this.tube = createTube(pathList, 0.001)

    this.material = createTubeMaterial()

    if (this.material) {
      this.tube.material = this.material
    }
  }

  public show(visible: boolean): void {
    if (this.tube) this.tube.isVisible = visible
  }

  // 可选：添加获取管道的访问器方法
  public getTube(): Mesh[] {
    return [this.tube]
  }

  // 可选：添加销毁方法
  public dispose(): void {
    if (this.tube) this.tube.dispose()
    if (this.material) this.material.dispose()
  }
}
