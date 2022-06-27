import { TOKEN_TIMEOUT_VALUE, TIME_STAMP } from '@/constant/index.js'
import { getItem, setItem } from '@/utils/storage.js'

// 获取开始登陆的时间戳
export function getStartLoginTimeStamp() {
  return getItem(TIME_STAMP)
}

// 缓存开始登陆的时间戳
export function setStartLoginTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

// 检测token是否过期
export function isCheckTokenTimeout() {
  // 获取当前的时间戳
  const currentTime = Date.now()
  // 获取开始登陆时间戳
  const startTime = getStartLoginTimeStamp()
  // 返回token是否有效
  return currentTime - startTime > TOKEN_TIMEOUT_VALUE
}
