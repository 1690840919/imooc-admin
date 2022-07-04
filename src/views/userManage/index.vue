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
            >添加用户</el-button
          >
          <el-input placeholder="请输入搜索内容" class="input-with-select">
            <template #prepend>
              <div class="name">搜索用户</div>
            </template>
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
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
    <el-dialog
      :width="500"
      title="添加用户"
      v-if="showCreateUserWindow"
      v-model="showCreateUserWindow"
    >
      <el-form ref="dialogForm" label-width="80px">
        <el-form-item label="用户ID" prop="userID">
          <el-input
            v-model="createUserForm.userID"
            placeholder="请输入用户ID"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="createUserForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="用户状态" prop="userStatus">
          <el-select style="width: 100%" v-model="createUserForm.userStatus">
            <el-option :value="1" label="开通"></el-option>
            <el-option :value="2" label="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="userRole">
          <el-select style="width: 100%" v-model="createUserForm.userRole">
            <el-option :value="1" label="超级管理员"></el-option>
            <el-option :value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="upload-avatar-box"
          label="用户头像"
          prop="userAvatar"
        >
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon>
              <Plus />
            </el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateUserWindow = false">取 消</el-button>
          <el-button @click="handleCreateUserConfirm" type="primary">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 显示用户信息 -->
    <el-dialog
      :width="600"
      title="用户信息"
      v-if="showUserInfoWindow"
      v-model="showUserInfoWindow"
    >
      <el-form ref="dialogForm" label-width="80px">
        <div class="user-info-top-box">
          <div class="user-info-left">
            <el-form-item label="用户ID" prop="userID">
              <el-input
                v-model="userInfoWindowData.userID"
                placeholder="请输入用户ID"
              />
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="userInfoWindowData.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </div>
          <div class="user-info-right">
            <el-form-item
              class="upload-avatar-box"
              label="用户头像"
              prop="userAvatar"
            >
              <el-avatar
                shape="square"
                :size="100"
                :src="userInfoWindowData.avatar"
              />
            </el-form-item>
          </div>
        </div>

        <el-form-item label="用户状态" prop="userStatus">
          <el-select
            style="width: 100%"
            v-model="userInfoWindowData.userStatus"
          >
            <el-option :value="1" label="开通"></el-option>
            <el-option :value="2" label="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="userRole">
          <el-select style="width: 100%" v-model="userInfoWindowData.userRole">
            <el-option :value="1" label="超级管理员"></el-option>
            <el-option :value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
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
// 添加用户表单
const createUserForm = reactive({
  userId: '',
  username: '',
  userRole: '',
  userStatus: '',
  userAvatar: ''
})
// 点击创建用户确认
const handleCreateUserConfirm = () => {
  console.log('正在创建用户')
  ElMessage.success('添加成功')
  showCreateUserWindow.value = false
}
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
  console.log(item)
  userInfoWindowData.value = item
  showUserInfoWindow.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-page {
  .box-card {
    position: relative;
    min-height: calc(100vh - 130px);

    .card-header {
      display: flex;
      justify-content: space-between;

      .input-with-select {
        width: 400px;
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

.upload-avatar-box {
}
.user-info-top-box {
  display: flex;
  div {
    flex: 1;
  }
}
</style>
