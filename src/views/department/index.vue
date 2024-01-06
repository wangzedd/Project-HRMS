<!-- 组织架构 -->
<template>
  <div class="app-container">
    <div class="main-content">
      <el-tree ref="departmentTree" :data="departmentData" :props="defaultProps" default-expand-all>
        <div class="department-area">
          <span>xx 公司</span>
          <div class="department-area-options">
            <span style="margin-right: 10px;">负责人</span>
            <el-dropdown>
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

      </el-tree>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      // 组织节点数据
      departmentData: [
        {
          label: 'terminal',
          managerName: 'admin',
          children: [
            { label: 'x1', managerName: 'xx1' },
            { label: 'x2', managerName: 'xx2' }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss">
.department-area {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  .department-area-options {

  }
}
</style>
