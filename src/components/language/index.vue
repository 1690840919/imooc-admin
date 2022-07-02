<template>
  <div class="chang-language-icon">
    <el-dropdown @command="handleCommand">
      <svg-icon type="iconfont" className="icon-zhongyingwen" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click="handleChangeLanguage('zh')"
            :disabled="$store.getters.language === 'zh'"
          >
            {{ $t('msg.layout.changeZhLanguageTip') }}
          </el-dropdown-item>
          <el-dropdown-item
            @click="handleChangeLanguage('en')"
            :disabled="$store.getters.language === 'en'"
          >
            {{ $t('msg.layout.changeEnLanguageTip') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()
// 切换中英文
const handleChangeLanguage = value => {
  store.commit('layout/setLanguage', value)
  i18n.locale.value = value
  ElMessage.success(i18n.t('msg.layout.changeLanguageSuccess'))
}
</script>

<style lang="scss" scoped>
</style>
