<template>
  <div class="menu-manage-page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            @click="showCreateMenuWindow = true"
            type="primary"
            class="button"
          >
            添加菜单
          </el-button>
          <div class="right-menu">
            <!-- 用户搜索 -->
            <el-input placeholder="请输入搜索内容" class="input-with-select">
              <template #prepend>
                <div class="name">搜索菜单</div>
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
        <el-table
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :data="menusList"
          style="width: 100%"
          row-key="menuPath"
        >
          <!-- 表格列内容设置 -->
          <el-table-column type="index" width="100" label="编号" />
          <el-table-column
            :align="
              ['menuLevel', 'menuRank'].includes(item.prop) ? 'center' : 'left'
            "
            v-for="item in menusRules"
            :prop="item.prop"
            :key="item.label"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
          />
          <el-table-column align="center" label="菜单状态">
            <template #default="scope">
              <el-switch v-model="scope.row.menuStatus" @change="handleMenuStatus(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleEditMenuBtn(scope.row)">
                编辑
              </el-button>
              <el-popconfirm
                confirm-button-text="是"
                cancel-button-text="否"
                :icon="InfoFilled"
                icon-color="red"
                title="确定要删除该菜单吗？"
                @confirm="handleDeleteMenu(scope.row)"
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
          :page-size="5"
          :total="20"
          @prev-text="handlePrevText"
          @next-text="handleNextText"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加菜单窗口 -->
    <add-menu v-model="showCreateMenuWindow" />
    <!-- 编辑菜单窗口 -->
    <edit-menu v-model="showEditMenuWindow" />
  </div>
</template>

<script setup>
import AddMenu from './components/addMenu.vue'
import EditMenu from './components/editMenu.vue'
import { Search } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 表格列内容设置
const menusRules = [
  {
    label: '菜单名称',
    prop: 'menuName'
  },
  {
    label: '菜单路由',
    prop: 'menuPath'
  },
  {
    label: '菜单级别',
    prop: 'menuLevel',
    formatter(item) {
      return ['一级', '二级', '三级', '四级'][item.menuLevel - 1]
    }
  },
  {
    label: '菜单图标',
    prop: 'menuIcon',
    width: 130
  },
  {
    label: '菜单排序',
    prop: 'menuRank',
    width: 100
  }
]
// 表格数据
const menusList = [
  {
    menuName: '个人中心',
    menuPath: '/personal',
    menuLevel: 1,
    menuIcon: 'platform',
    menuStatus: true,
    menuRank: 1
  },
  {
    menuName: '用户管理',
    menuPath: '/userManage',
    menuLevel: 1,
    menuIcon: 'user',
    menuStatus: true,
    menuRank: 2
  },
  {
    menuName: '权限管理',
    menuPath: '/permission',
    menuLevel: 1,
    menuIcon: 'setting',
    menuStatus: true,
    menuRank: 3,
    children: [
      {
        menuName: '角色管理',
        menuPath: '/permission/roleManage',
        menuLevel: 2,
        menuIcon: 'user',
        menuStatus: true,
        menuRank: 1
      }
    ]
  },
  {
    menuName: '服务管理',
    menuPath: '/service',
    menuLevel: 1,
    menuIcon: 'school',
    menuStatus: true,
    menuRank: 4,
    children: [
      {
        menuName: '文章管理',
        menuPath: '/service/articleManage',
        menuLevel: 2,
        menuIcon: 'tickets',
        menuStatus: true,
        menuRank: 1
      }
    ]
  }
]
// 点击删除菜单
const handleDeleteMenu = () => {
  ElMessage.success('删除成功')
}
// 显示添加菜单窗口
const showCreateMenuWindow = ref(false)
// 点击编辑菜单
const handleEditMenuBtn = () => {
  showEditMenuWindow.value = true
}
// 显示编辑菜单窗口
const showEditMenuWindow = ref(false)
// 点击菜单状态开关
const handleMenuStatus = item => {
  ElMessage.success('切换成功')
}
</script>

<style lang="scss" scoped>
.menu-manage-page {
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
    .page-box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 50px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
