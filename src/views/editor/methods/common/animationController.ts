import { AnimationGroup, AnimationEvent } from "@babylonjs/core/Legacy/legacy"
import { debounce } from "@/utils/common-methods"
/**
 * 多动画控制器，用于管理 Babylon.js 动画组的播放、暂停、循环等操作。
 * 支持单次播放、循环播放、跳转到指定帧、重置动画等功能。
 *
 * @constructor
 * 创建一个新的 MultipleAnimationController 实例，并传入一组 AnimationGroup。
 * 每个 AnimationGroup 会被分配一个唯一标识符（从 "1" 开始），并存储在 Map 中以便后续通过 ID 访问。
 *
 * @method play
 * 播放指定 ID 的动画组，可选地设置播放速度和播放完成回调。
 * 在播放前会停止当前正在播放的动画。
 *
 * @method loopPlay
 * 循环播放指定 ID 的动画组，可指定循环次数、播放速度和完成回调。
 * 如果播放过程中发生错误，会记录错误信息并停止动画。
 *
 * @method pause
 * 暂停当前正在播放的动画。
 *
 * @method isPlaying
 * 返回当前是否有动画正在播放。
 *
 * @method getCurrentAnimationId
 * 获取当前正在播放的动画组的 ID。
 *
 * @method gotoFrame
 * 跳转到指定动画组的某一帧并暂停。
 *
 * @method reset
 * 将指定动画组重置到第 0 帧。
 *
 * @method stopCurrentAnimation
 * 停止当前正在播放的动画。
 */
export class MultipleAnimationController {
  private _animationGroups: Map<string, AnimationGroup> // 使用唯一标识符存储动画组
  private _currentAnimationGroup: AnimationGroup | null = null
  private _speedRatio: number = 0.2
  private _isPlaying: boolean = false
  private _animationEndObserver: any // 根据实际类型替换为具体类型

  constructor(animationGroups: AnimationGroup[]) {
    const entries = animationGroups.map(
      (group, i) => [(i + 1).toString(), group] as [string, AnimationGroup],
    )
    this._animationGroups = new Map(entries)
  }

  /**
   * 播放指定 ID 的动画组。
   *
   * @param id - 动画组的唯一标识符，用于查找并播放对应的 AnimationGroup。
   * @param speed - 可选参数，设置动画播放速度，默认0.2。
   * @param event - 可选参数，在动画播放完成后执行的回调函数。
   */
  public play(id: string, speed?: number, event?: () => void): void {
    const group = this._animationGroups.get(id)
    if (!group) throw new Error(`AnimationGroup with ID ${id} not found.`)

    // 清理当前动画的状态
    this.stopCurrentAnimation()
    this._currentAnimationGroup = group
    // 提前设置 speedRatio，确保播放时生效
    group.speedRatio = speed ?? this._speedRatio

    // 使用单独的变量保存 observer 引用以便移除
    const onAnimationEnd = () => {
      if (event) event()
      //事件执行完以后移除监听
      if (this._animationEndObserver) {
        group.onAnimationGroupEndObservable.remove(this._animationEndObserver)
      }
    }
    // 添加新的监听器并保存引用
    this._animationEndObserver = group.onAnimationGroupEndObservable.add(onAnimationEnd)
    // 开始播放
    group.play()
    this._isPlaying = true
  }

  public loopPlay(id: string, loopCount: number, speedRatio?: number, event?: () => void): void {
    if (loopCount <= 0) {
      console.warn("循环次数必须大于 0")
      return
    }

    const group = this._animationGroups.get(id)
    if (!group) throw new Error(`AnimationGroup with ID ${id} not found.`)

    let remainingLoops = loopCount
    group.speedRatio = speedRatio ?? this._speedRatio

    // 移除旧监听器，防止重复绑定
    if (this._animationEndObserver) {
      group.onAnimationGroupEndObservable.remove(this._animationEndObserver)
    }

    const onAnimationEnd = () => {
      remainingLoops--
      if (remainingLoops > 0) {
        try {
          group.play()
        } catch (error) {
          console.error("动画播放失败", error)
          this._isPlaying = false
          return
        }
      } else {
        // 清理监听器
        group.onAnimationGroupEndObservable.remove(this._animationEndObserver)
        this._isPlaying = false
        if (event) {
          event()
        }
      }
    }

    // 绑定新监听器
    this._animationEndObserver = group.onAnimationGroupEndObservable.add(onAnimationEnd)

    // 开始播放
    try {
      this._isPlaying = true
      group.play()
    } catch (error) {
      console.error("首次播放动画失败", error)
      this._isPlaying = false
    }
  }
  public pause(): void {
    if (this._currentAnimationGroup) {
      this._currentAnimationGroup.pause()
      this._isPlaying = false
    }
  }

  public isPlaying(): boolean {
    return this._isPlaying
  }

  public getCurrentAnimationId(): string | null {
    return (
      Array.from(this._animationGroups.entries()).find(
        ([, group]) => group === this._currentAnimationGroup,
      )?.[0] || null
    )
  }
  public gotoFrame(id: string, frame: number): void {
    const group = this._animationGroups.get(id)
    if (!group) return
    this._currentAnimationGroup = group
    this._currentAnimationGroup.play()
    if (this._currentAnimationGroup) {
      this._currentAnimationGroup.goToFrame(frame)
    }
    this._currentAnimationGroup.pause()
  }
  public reset(id: string) {
    this.gotoFrame(id, 0)
  }
  public stopCurrentAnimation(): void {
    if (this._currentAnimationGroup) {
      this._currentAnimationGroup.stop()
    }
  }
}

