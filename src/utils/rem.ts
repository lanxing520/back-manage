import { debounce } from "./common-methods"

// 设置根元素字体大小
function setRem() {
  const baseSize = 16 // 基准字体大小
  const designWidth = 1920 // 设计稿宽度
  const scale = document.documentElement.clientWidth / designWidth
  const clampedScale = Math.max(Math.min(scale, 2), 0.6) // 限制缩放范围
  document.documentElement.style.fontSize = baseSize * clampedScale + "px"
}

// 确保DOM加载完成后再执行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setRem()
    window.addEventListener("resize", debounce(setRem, 200))
  })
} else {
  setRem()
  window.addEventListener("resize", debounce(setRem, 200))
}
