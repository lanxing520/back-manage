import {
  Scene,
  AbstractEngine,
  Light,
  Vector3,
  EngineFactory,
  DirectionalLight,
  HemisphericLight,
  ImportMeshAsync,
} from "@babylonjs/core/Legacy/legacy"
import { disposeAllModle } from "./loadModle"
import applyConfig from "./config"
import { disposeAllClickHandlers, disposeAudio } from "./action"
import { CreateCamera } from "./camera"
import { getModelAssetsUrl } from "@/utils/getBabylonAssets"
export let scene: Scene | undefined
export let engine: AbstractEngine | null
export let camera: CreateCamera | null
let light: Light | null

export const loading = ref(false)

interface ILoadingScreen {
  //What happens when loading starts
  displayLoadingUI: () => void
  //What happens when loading stops
  hideLoadingUI: () => void
}
class CustomLoadingScreen implements ILoadingScreen {
  constructor(
    public loadingUIText: string,
    public loadingUIBackgroundColor: string,
  ) {}
  public displayLoadingUI() {
    loading.value = true
  }
  public hideLoadingUI() {
    loading.value = false
  }
}
export async function initScene(
  canvasDom: HTMLCanvasElement,
  option?: {
    camera?: {
      alpha?: number
      beta?: number
      radius?: number
      target?: Vector3
    }
  },
) {
  if (engine && scene) return
  loading.value = true
  // registerBuiltInLoaders()
  // 1. 初始化引擎和场景
  engine = await EngineFactory.CreateAsync(canvasDom, {
    GPUPowerPreference: "high-performance",
    stencil: true,
  })
  var loadingScreen = new CustomLoadingScreen("loading!!", "#23272e")
  engine.loadingScreen = loadingScreen
  engine.displayLoadingUI()
  scene = new Scene(engine)

  // 2. 设置相机和灯光

  camera = new CreateCamera(canvasDom, option?.camera)
  // scene.collisionsEnabled = true
  // camera.checkCollisions = true
  await applyConfig()
  // light = new DirectionalLight("DirectionalLight", new Vector3(0, -1, -2), scene)
  const light0 = new HemisphericLight("HemiLight", new Vector3(0, 1.5, 0), scene)

  light0.intensity = 1.2
  // light.intensity = 1


  console.log(scene)

  // hide the loading screen when you want to
  engine.hideLoadingUI()

  // 4. 启动渲染循环
  engine.runRenderLoop(() => {
    if (scene) {
      scene.render()
    }
  })

  // 窗口大小调整
  window.addEventListener("resize", resize)
}

export function dispose() {
  engine?.stopRenderLoop()
  if (!scene) return

  scene.stopAllAnimations()

  // 场景清理时

  engine?.wipeCaches(true) // 强制清理GPU缓存

  // 销毁所有网格
  scene.meshes.forEach((mesh) => mesh.dispose())
  // 销毁所有材质
  scene.materials.forEach((material) => material.dispose())
  // 销毁所有灯光
  scene.lights.forEach((light) => light.dispose())
  // 销毁所有纹理
  scene.textures.forEach((texture) => texture.dispose())
  scene.transformNodes.forEach((node) => node.dispose())
  scene.animationGroups.forEach((group) => group.dispose())
  // 销毁所有粒子系统
  scene.particleSystems.forEach((ps) => ps.dispose())
  //销毁所有导入的glb的mesh 和 鼠标移入显示信息事件
  disposeAllModle()
  //销毁点击事件
  disposeAllClickHandlers()
  //销毁音频
  disposeAudio()

  engine?.dispose()
  light?.dispose()
  scene.dispose()
  // console.log("销毁完成",engine,scene);

  scene = undefined
  engine = null
  light = null
  window.removeEventListener("resize", resize)
}

const resize = () => {
  if (engine) {
    engine.resize()
  }
}
