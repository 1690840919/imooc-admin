<template>
  <div class="role-manage-page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            @click="showCreateRoleWindow = true"
            type="primary"
            class="button"
            >添加角色</el-button
          >
          <el-input placeholder="请输入搜索内容" class="input-with-select">
            <template #prepend>
              <div class="name">搜索角色</div>
            </template>
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </div>
      </template>
      <div class="table-box">
        <!-- 表格 -->
        <el-table :data="rolesList" style="width: 100%">
          <!-- 表格列内容设置 -->
          <el-table-column
            v-for="item in rolesRules"
            :prop="item.prop"
            :key="item.label"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
          />
          <el-table-column label="权限" width="350">
            <template #default="scope">
              <el-tag
                class="permission-tag"
                v-for="name in scope.row.permission"
                :key="name"
              >
                {{ name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handlePermissionBtn(scope.row)">
                设置权限
              </el-button>
              <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="red"
                title="确定要删除该角色吗？"
                @confirm="handleDeleteRole(scope.row)"
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
    </el-card>
    <!-- 添加角色弹窗 -->
    <el-dialog
      :width="500"
      title="添加角色"
      v-if="showCreateRoleWindow"
      v-model="showCreateRoleWindow"
    >
      <el-form ref="dialogForm" label-width="80px">
        <el-form-item label="角色名称" prop="userTitle">
          <el-input
            v-model="createRoleForm.userTitle"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            v-model="createRoleForm.description"
            placeholder="请输入角色描述"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateRoleWindow = false">取 消</el-button>
          <el-button @click="handleWindowConfirm" type="primary">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限分配弹窗 -->
    <el-dialog
      :width="500"
      title="权限分配"
      v-if="showPermissionWindow"
      v-model="showPermissionWindow"
    >
      <el-tree
        :data="permissionData"
        show-checkbox
        node-key="id"
        :default-checked-keys="currentPermission"
        :props="defaultProps"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermissionWindow = false">取 消</el-button>
          <el-button @click="handlePermissionConfirm" type="primary">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getTime } from '@/utils/time.js'
import { Search } from '@element-plus/icons'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
// 表格列内容设置
const rolesRules = [
  {
    type: 'index',
    label: '编号',
    width: 100
  },
  {
    prop: 'role',
    label: '角色',
    width: 150
  },
  {
    prop: 'description',
    label: '描述'
  },
  {
    prop: 'addTime',
    label: '添加时间',
    width: 200,
    formatter(item) {
      return getTime(item.addTime, 'YY-MM-DD hh:mm:ss')
    }
  }
]
// 表格数据
const rolesList = [
  {
    id: 111,
    role: '超级管理员',
    permission: [
      '个人中心',
      '用户管理',
      '用户管理',
      '角色管理',
      '菜单管理',
      '资源管理'
    ],
    description: '拥有最高权限的管理员',
    addTime: Date.now()
  },
  {
    id: 222,
    role: '管理员',
    permission: ['个人中心', '用户管理'],
    description: '普通的用户管理员',
    addTime: Date.now()
  }
]
// 是否显示创建角色窗口
const showCreateRoleWindow = ref(false)
// 创建角色表单
const createRoleForm = reactive({
  userTitle: '',
  description: ''
})
// 点击确认创建角色
const handleWindowConfirm = () => {
  console.log('创建角色')
  showCreateRoleWindow.value = false
  ElMessage.success('添加成功')
}
// 点击删除角色
const handleDeleteRole = (item) => {
  console.log('点击删除角色', item.id)
  ElMessage.success('删除成功')
}
// 是否显示权限分配
const showPermissionWindow = ref(false)
// 用户当前的权限
const currentPermission = ref([])
// 点击权限分配
const handlePermissionBtn = (item) => {
  showPermissionWindow.value = true
  currentPermission.value = item.permission
}
// 权限数据
const permissionData = [
  {
    id: '个人中心',
    label: '个人中心'
  },
  {
    id: '用户管理',
    label: '用户管理'
  },
  {
    id: '权限管理',
    label: '权限管理',
    children: [
      {
        id: '角色管理',
        label: '角色管理'
      },
      {
        id: '菜单管理',
        label: '菜单管理'
      },
      {
        id: '资源管理',
        label: '资源管理'
      }
    ]
  }
]
// 点击确认权限分配
const handlePermissionConfirm = () => {
  console.log('正在权限分配')
  showPermissionWindow.value = false
  ElMessage.success('设置成功')
}
</script>

<style lang="scss" scoped>
.role-manage-page {
  .box-card {
    min-height: calc(100vh - 80px);

    .card-header {
      display: flex;
      justify-content: space-between;

      .input-with-select {
        width: 400px;
      }
    }
  }

  .permission-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
