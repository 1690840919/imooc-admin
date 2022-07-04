<template>
  <div class="user-manage-page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            v-permission="['super-admin']"
            @click="showCreateUserWindow = true"
            type="primary"
            class="button"
          >
            添加用户
          </el-button>
          <div class="right-menu">
            <!-- 用户导入 -->
            <div class="add-user-btn user-btn">
              <el-button @click="showImportUserWindow = true">
                导入用户
              </el-button>
            </div>

            <!-- 用户导出 -->
            <div class="down-user-btn user-btn">
              <el-button @click="showExportUserWindow = true">
                导出用户
              </el-button>
            </div>

            <!-- 用户搜索 -->
            <el-input placeholder="请输入搜索内容" class="input-with-select">
              <template #prepend>
                <div class="name">搜索用户</div>
              </template>
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </div>
        </div>
      </template>
      <div class="table-box">
        <!-- 表格 -->
        <el-table :data="usersList" style="width: 100%">
          <!-- 表格列内容设置 -->
          <el-table-column
            v-for="item in usersRules"
            :type="item.type"
            :prop="item.prop"
            :key="item.label"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
          />
          <el-table-column align="center" label="用户头像">
            <template #default="scope">
              <el-avatar :size="50" :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="账号状态">
            <el-switch v-model="value" />
          </el-table-column>
          <el-table-column align="center" label="操作" width="230">
            <template #default="scope">
              <el-button size="small" @click="handleShowUserInfoBtn(scope.row)">
                查看
              </el-button>
              <el-button size="small" @click="handlePermissionBtn(scope.row)">
                编辑
              </el-button>
              <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="red"
                title="确定要删除该用户吗？"
                @confirm="handleDeleteUser(scope.row)"
                @cancel="cancelEvent"
              >
                <template #reference>
                  <el-button type="danger" size="small"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageData.num"
          :total="pageData.total"
          @prev-text="handlePrevText"
          @next-text="handleNextText"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户弹窗 -->
    <add-user v-model="showCreateUserWindow" />
    <!-- 显示用户信息 -->
    <user-info
      v-model="showUserInfoWindow"
      :userInfoWindowData="userInfoWindowData"
    />
    <!-- 显示导出用户窗口 -->
    <export-user v-model="showExportUserWindow" />
    <!-- 显示导入用户窗口 -->
    <import-user v-model="showImportUserWindow" />
  </div>
</template>

<script setup>
import ImportUser from './components/importUser.vue'
import ExportUser from './components/exportUser.vue'
import AddUser from './components/addUser.vue'
import UserInfo from './components/userInfo.vue'
import { ref, reactive } from 'vue'
import { getTime } from '@/utils/time.js'
import { Search } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
// 表格列内容设置
const usersRules = [
  {
    type: 'index',
    label: '编号',
    width: 100
  },
  {
    label: '用户账号',
    prop: 'username'
  },
  {
    label: '用户角色',
    prop: 'userRole'
  },
  {
    prop: 'lastLoginTime',
    label: '最后一次登陆时间',
    width: 200,
    formatter(item) {
      return getTime(item.lastLoginTime, 'YY-MM-DD hh:mm:ss')
    }
  }
]
// 表格数据
const usersList = [
  {
    userId: 10001,
    username: 'super-admin',
    userRole: '超级管理员',
    lastLoginTime: Date.now(),
    avatar:
      'https://img2.baidu.com/it/u=3350630607,1397825411&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
  },
  {
    userId: 10002,
    username: 'admin',
    userRole: '管理员',
    lastLoginTime: Date.now(),
    avatar:
      'https://img2.baidu.com/it/u=3350630607,1397825411&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
  }
]
// 分页数据
const pageData = reactive({
  total: 100
})
// 是否显示添加用户窗口
const showCreateUserWindow = ref(false)

// 点击删除用户
const handleDeleteUser = item => {
  console.log('正在删除用户', item.userID)
  ElMessage.success('删除成功')
}
// 显示用户信息
const showUserInfoWindow = ref(false)
// 用户信息
const userInfoWindowData = ref(null)
// 点击查看用户信息
const handleShowUserInfoBtn = item => {
  userInfoWindowData.value = item
  showUserInfoWindow.value = true
}
// 显示导出用户窗口
const showExportUserWindow = ref(false)
// 显示导入用户窗口
const showImportUserWindow = ref(false)
</script>

<style lang="scss" scoped>
.user-manage-page {
  .box-card {
    position: relative;
    min-height: calc(100vh - 130px);

    .card-header {
      display: flex;
      justify-content: space-between;

      .right-menu {
        display: flex;
        .user-btn {
          margin-right: 20px;
        }
        .input-with-select {
          width: 400px;
        }
      }
    }
  }
  .page-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
