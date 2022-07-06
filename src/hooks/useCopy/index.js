import { ElMessage } from 'element-plus'

export const useCopy = (text) => {
  // 创建输入框
  const inputDom = document.createElement('input')
  // 给输入框赋值
  inputDom.value = text
  // 追加进去body
  document.body.appendChild(inputDom)
  // 选择输入框的操作
  inputDom.select()
  // 执行复制操作
  document.execCommand('Copy')
  // 删除输入框
  document.body.removeChild(inputDom)
  // 复制成功提示
  ElMessage.success('复制成功')
}
