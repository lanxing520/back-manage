import {
  Scene,
  AbstractMesh,
  Vector3,
  Color3,
  Ray,
  PointerEventTypes,
  Mesh,
  TransformNode,
  Node,
  HighlightLayer,
} from "@babylonjs/core/Legacy/legacy"
import type { Nullable } from "@babylonjs/core/types"
import { scene } from "./initScene"
interface DragAndDropOptions {
  onDrop?: (draggedMesh: AbstractMesh | Mesh, targetMesh: AbstractMesh | Mesh | null) => void
  onMoveStart?: () => void
  onMove?: (draggedMesh: AbstractMesh) => void
  canPickup?: (mesh: AbstractMesh | Mesh) => boolean
  canDropOn?: (draggedMesh: AbstractMesh | Mesh, targetMesh: AbstractMesh | Mesh) => boolean
  pickupOffset?: Vector3
}

export class AdvancedMeshDragger {
  private originalPosition: Vector3
  private originalParent: Nullable<Node>
  private draggedMesh: AbstractMesh | null = null
  private clickTimeout: number | null = null
  private _pointerObserver: any
  private options: DragAndDropOptions
  private highlightLayer: HighlightLayer | null = null

  constructor(options: DragAndDropOptions = {}) {
    this.options = {
      pickupOffset: new Vector3(0, 0.05, 0),
      ...options,
    }
    this.originalPosition = Vector3.Zero()
    this.originalParent = null
    this.setupPointerEvents()

    // 初始化高亮层
    if (typeof HighlightLayer !== "undefined") {
      this.highlightLayer = new HighlightLayer("highlight", scene)
    }
  }

  private setupPointerEvents() {
    if (!scene) return
    // 处理指针事件
    this._pointerObserver = scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERMOVE:
          this.handlePointerMove()
          break
        case PointerEventTypes.POINTERPICK:
          if (pointerInfo.event.button === 0) {
            // 左键释放
            if (!this.draggedMesh) {
              this.pickUpMesh(pointerInfo)
              if (this.options.onMoveStart) {
                this.options.onMoveStart()
              }
            } else {
              this.handlePointerUp()
            }
          }
          break
      }
    })
  }

  private pickUpMesh(pointerInfo: any) {
    if (!scene) return
    const pickResult = scene.pick(scene.pointerX, scene.pointerY)

    if (pickResult.hit && pickResult.pickedMesh) {
      const mesh = pickResult.pickedMesh

      // 查找根节点（通常是TransformNode）
      let rootMesh = mesh
      while (rootMesh.parent && rootMesh.parent instanceof TransformNode) {
        rootMesh = rootMesh.parent as Mesh
      }
      // 检查是否可以拾取该Mesh
      if (this.options.canPickup && !this.options.canPickup(rootMesh)) {
        return
      }

      this.draggedMesh = rootMesh
      this.originalPosition = rootMesh.absolutePosition.clone()
      this.originalParent = rootMesh.parent

      // 解除父级关系以便自由移动
      rootMesh.setParent(null)

      // 高亮显示被拖拽的Mesh
      if (this.highlightLayer) {
        this.highlightLayer.addMesh(mesh as Mesh, new Color3(151 / 255, 1, 1))
      }

      // 禁用物理效果（如果有）
      // if (mesh.physicsImpostor) {
      //   mesh.physicsImpostor.setLinearVelocity(Vector3.Zero())
      //   mesh.physicsImpostor.setAngularVelocity(Vector3.Zero())
      // }
    }
  }
  public setDragMesh(meshName: string) {
    if (!scene) return

    // 查找具有指定名称的 mesh
    const mesh = scene.getMeshByName(meshName)

    if (!mesh) {
      console.warn(`Mesh with name "${meshName}" not found.`)
      return
    }

    // 检查是否可以拾取该 Mesh
    if (this.options.canPickup && !this.options.canPickup(mesh)) {
      return
    }

    this.draggedMesh = mesh
    this.originalPosition = mesh.absolutePosition.clone()
    this.originalParent = mesh.parent

    // 解除父级关系以便自由移动
    mesh.setParent(null)

    // 高亮显示被拖拽的 Mesh
    if (this.highlightLayer) {
      this.highlightLayer.addMesh(mesh as Mesh, new Color3(151 / 255, 1, 1))
    }

    // 触发 onMoveStart 回调
    if (this.options.onMoveStart) {
      this.options.onMoveStart()
    }
  }
  private handlePointerMove() {
    if (!this.draggedMesh) return
    if (!scene) return
    // 创建从相机到鼠标位置的射线
    const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, null, scene.activeCamera)

    // 计算与地面的交点（假设地面在y=0）
    const groundPlaneNormal = new Vector3(0, 1.5, 0)
    const groundPlanePoint = new Vector3(0, 1.1, 0)

    const distance =
      Vector3.Dot(groundPlanePoint.subtract(ray.origin), groundPlaneNormal) /
      Vector3.Dot(ray.direction, groundPlaneNormal)

    if (distance > 0) {
      let newPosition = ray.origin.add(ray.direction.scale(distance))
      // 添加拾取偏移
      if (this.options.pickupOffset) {
        newPosition = newPosition.add(this.options.pickupOffset)
      }
      this.draggedMesh.position = newPosition
    }
    if (this.options.onMove) {
      this.options.onMove(this.draggedMesh)
    }
  }

  private handlePointerUp() {
    if (this.draggedMesh) {
      // 移除高亮
      if (this.highlightLayer) {
        this.highlightLayer.removeAllMeshes()
      }
      // 检查是否放置在其他Mesh上
      if (!scene) return
      const pickResult = scene.pick(scene.pointerX, scene.pointerY)
      let targetMesh: AbstractMesh | null = null

      if (pickResult.hit && pickResult.pickedMesh && pickResult.pickedMesh !== this.draggedMesh) {
        targetMesh = pickResult.pickedMesh

        // 检查是否可以放置在该Mesh上
        if (this.options.canDropOn && !this.options.canDropOn(this.draggedMesh, targetMesh)) {
          this.draggedMesh.position = this.originalPosition.clone()
        } else {
          //正确放置
          if (this.options.onDrop) {
            this.options.onDrop(this.draggedMesh, targetMesh)
          }
        }
      } else {
        this.draggedMesh.position = this.originalPosition.clone()
      }
      this.draggedMesh = null
    }
  }

  public dispose() {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
    }

    // 移除指针事件监听器（需先保存引用以便移除）
    if (this._pointerObserver && scene) {
      scene.onPointerObservable.remove(this._pointerObserver)
      this._pointerObserver = null
    }

    // 清理高亮层
    if (this.highlightLayer) {
      this.highlightLayer.removeAllMeshes()
      this.highlightLayer.dispose()
      this.highlightLayer = null
    }

    // 重置其他状态
    this.draggedMesh = null
    this.originalParent = null
    this.originalPosition = Vector3.Zero()
  }
}

// 使用示例
// const dragger = new AdvancedMeshDragger({
//   canPickup: (mesh) => mesh.name === "直头眼科剪",
//   canDropOn: (draggedMesh, targetMesh) =>
//     targetMesh.name === "酒精灯" && draggedMesh.name === "直头眼科剪",
//   // 正确放置事件处理
//   onDrop: (draggedMesh, targetMesh) => {},
// })
