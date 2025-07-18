import { AbstractMesh, Mesh, MeshBuilder, Vector3 } from "@babylonjs/core"
import { scene } from "../common/initScene"
import * as GUI from "@babylonjs/gui"
import type { NumberArray } from "./interface"

export class ButtonControl {
  private plane: Mesh
  private button: GUI.Button
  private advancedTexture: GUI.AdvancedDynamicTexture
  private longPressInterval: number | null = null
  private triggerInterval = 100 // 每隔 100ms 触发一次 pointerDown

  constructor(
    position: NumberArray,
    rotation: NumberArray,
    text: string,
    private pointerDown?: () => void,
    private pointerUp?: () => void,
  ) {
    const width = 0.4
    const height = 0.2
    this.plane = MeshBuilder.CreatePlane("plane", { width, height }, scene)
    this.plane.position = new Vector3(...position)
    this.plane.rotation = new Vector3(...rotation)

    this.advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.plane)

    this.button = GUI.Button.CreateSimpleButton("but1", text)
    this.button.width = width
    this.button.height = height
    this.button.color = "white"
    this.button.fontSize = 50
    this.button.background = "#0d5481"

    if (this.pointerDown) {
      this.button.onPointerDownObservable.add(() => {
        if (this.longPressInterval) return
        if (!this.pointerDown) return
        this.pointerDown()

        this.longPressInterval = window.setInterval(() => {
          this.pointerDown!()
        }, this.triggerInterval)
      })

      this.button.onPointerUpObservable.add(() => {
        if (this.longPressInterval !== null) {
          clearInterval(this.longPressInterval)
          this.longPressInterval = null
        }

        if (this.pointerUp) {
          this.pointerUp()
        }
      })
    }

    this.advancedTexture.addControl(this.button)
  }

  /**
   * 隐藏按钮
   */
  public hide(): void {
    this.button.isVisible = false
  }

  /**
   * 显示按钮
   */
  public show(): void {
    this.button.isVisible = true
  }

  /**
   * 设置按钮文本
   * @param text 新文本内容
   */
  public setText(text: string): void {
    this.button.textBlock!.text = text
  }

  /**
   * 设置按钮背景颜色
   * @param color 颜色值，如 "#ff0000"
   */
  public setBackgroundColor(color: string): void {
    this.button.background = color
  }

  /**
   * 销毁资源
   */
  public dispose(): void {
    if (this.longPressInterval !== null) {
      clearInterval(this.longPressInterval)
      this.longPressInterval = null
    }

    this.button.dispose()
    this.plane.dispose()
    this.advancedTexture.dispose()
  }
}
