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
      >
        <!-- 部门树形结构区域 -->
        <template v-slot="{ data }">
          <div class="department-area">
            <span>{{ data.name }}</span>
            <!-- 右侧部分：负责人+下拉菜单 -->
            <div class="department-area-right">
              <span style="margin-right: 20px">{{ data.managerName }}</span>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { transListToTree } from '@/utils'
import { getDepartments } from '@/api/department'
export default {
  name: 'Department',
  data() {
    return {
      departmentData: [], // 组织节点数据
      treeLoading: true, // 数据加载状态
      defaultProps: {
        children: 'children',
        name: 'name'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取组织架构
    getDepartment() {
      getDepartments().then((res) => {
        this.treeLoading = false
        const result = res
        this.departmentData = transListToTree(result, 0) // 树形数据转换，0为根节点id
      })
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
