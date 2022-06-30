<template>
  <div class="home-header">
    <div class="breadcrumb-box">
      <div class="collapse-btn-box">
        <svg-icon
          @click="handleCollapse(false)"
          v-if="$store.getters.isCollapse"
          :size="20"
          icon="expand"
        />
        <svg-icon @click="handleCollapse(true)" v-else icon="fold" :size="20" />
      </div>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="/">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          class="breadcrumb-item"
          :key="item.meta.title"
          v-for="item in $route.matched.filter(item => item.meta.title)"
          :to="{ path: item.path }"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menus-box">
      <!-- 中英文切换 -->
      <div class="chang-language-icon">
        <el-dropdown @command="handleCommand">
          <svg-icon type="iconfont" className="icon-zhongyingwen" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleChangeLanguage('zh')" :disabled="$store.getters.language==='zh'">
                {{ $t('msg.layout.changeZhLanguageTip') }}
              </el-dropdown-item>
              <el-dropdown-item @click="handleChangeLanguage('en')" :disabled="$store.getters.language==='en'">
                {{ $t('msg.layout.changeEnLanguageTip') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-dropdown>
        <span v-if="$store.state.user.userInfo" class="el-dropdown-link">
          {{ $store.state.user.userInfo.name }}
          <el-icon class="el-icon--right">
            <svg-icon icon="user" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleCancelLoginBtn">
              {{ $t('msg.layout.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()
// 点击退出登陆
const handleCancelLoginBtn = () => {
  store.dispatch('user/logout')
  ElMessage.success('退出成功')
}
// 点击折叠
const handleCollapse = value => {
  store.commit('layout/setIsCollapse', value)
}
// 切换中英文
const handleChangeLanguage = value => {
  store.commit('layout/setLanguage', value)
  i18n.locale.value = value
  ElMessage.success(i18n.t('msg.layout.changeLanguageSuccess'))
}
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .breadcrumb-box {
    display: flex;
    align-items: center;

    .collapse-btn-box {
      padding-right: 10px;
      position: relative;
      top: 0.5px;
      cursor: pointer;
    }

    .breadcrumb-item {
      color: red !important;
    }
  }

  .menus-box {
    display: flex;
    align-items: center;

    .chang-language-icon {
      padding: 0 20px;
      cursor: pointer;
    }
  }
}
</style>
