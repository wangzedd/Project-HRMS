<!-- 组织架构 -->
<template>
  <div class="app-container">
    <div class="main-content">
      <el-tree
        ref="departmentTree"
        v-loading="treeLoading"
        class="department-tree"
        :data="departmentData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
      >
        <!-- 部门树形结构区域 -->
        <template v-slot="{ data }">
          <div class="department-area">
            <span>{{ data.name }}</span>
            <!-- 右侧部分：负责人+下拉菜单 -->
            <div class="department-area-right">
              <span style="margin-right: 20px">{{ data.managerName }}</span>
              <!-- $event 实参 -->
              <el-dropdown placement="bottom-start" trigger="click" @command="operateDepartment($event, data.id)">
                <span class="el-dropdown-link"> 操作<i class="el-icon-arrow-down el-icon--right" /> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
      <!-- .sync 修饰符是 Vue 的一种语法糖，相当于监听了'update:showDialog'，简化了父组件的接收 -->
      <op
        :dept-data="deptData"
        :current-node-id="currentNodeId"
        :show-dialog.sync="showDialog"
        @updateDepartment="getDepartment"
      />
    </div>
  </div>
</template>
<script>
import { transListToTree } from '@/utils' // 树形数据转换方法
import { getDepartments } from '@/api/department'
import op from './components/op.vue'
export default {
  name: 'Department',
  components: { op },
  data() {
    return {
      deptData: [], // 组织架构数据
      departmentData: [], // 组织架构树形节点数据
      treeLoading: true, // 数据加载状态
      defaultProps: {
        children: 'children',
        name: 'name'
      },
      currentNodeId: null, // 当前操作的部门节点id
      showDialog: false //  控制操作弹窗的显示和隐藏
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    /** 获取组织架构 */
    async getDepartment() {
      this.treeLoading = true
      const result = await getDepartments()
      this.treeLoading = false
      this.departmentData = transListToTree(result, 0) // 树形数据转换，0为根节点id
    },
    /** 下拉菜单：操作部门 */
    async operateDepartment(command, id) {
      // 添加子部门
      if (command === 'add') {
        this.currentNodeId = id
        const resultDept = await getDepartments()
        this.deptData = resultDept
        this.showDialog = true
      }
    }
  }
}
</script>
<style lang="scss">
.department-tree {
  margin: 0 auto;
  width: 70%;
}
.department-area {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  // .department-area-right {}
}
</style>
