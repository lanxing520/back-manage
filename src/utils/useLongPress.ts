export function useLongPress(
  callback: () => void,
  options?: { interval?: number; delay?: number },
) {
  const interval = options?.interval || 100
  const delay = options?.delay || 0
  const pressTimer = ref<number | null>(null)
  const initialTimer = ref<number | null>(null)

  const start = (e: Event) => {
    if (e.type === "touchstart") {
      e.preventDefault()
    }

    end() // 先清除可能存在的定时器

    initialTimer.value = setTimeout(() => {
      callback()
      pressTimer.value = setInterval(callback, interval)
    }, delay)
  }

  const end = () => {
    if (initialTimer.value !== null && pressTimer.value !== null) {
      clearTimeout(initialTimer.value)
      clearInterval(pressTimer.value)
      initialTimer.value = null
      pressTimer.value = null
    }
  }

  return {
    start,
    end,
  }
}
