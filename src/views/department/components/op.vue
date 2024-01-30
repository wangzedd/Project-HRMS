<template>
  <el-dialog
    ref="departmentDialog"
    :title="deptDialog.title"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    :before-close="handleClose"
    width="50%"
  >
    <el-form ref="deptForm" :model="defaultForm" :rules="formRules" label-width="120px">
      <el-form-item prop="deptName" label="部门名称">
        <el-input v-model="defaultForm.deptName" placeholder="2-10个字符" style="width: 80%" />
      </el-form-item>
      <el-form-item prop="deptCode" label="部门编码">
        <el-input v-model="defaultForm.deptCode" placeholder="2-10个字符" style="width: 80%" />
      </el-form-item>
      <el-form-item prop="deptManager" label="部门负责人">
        <el-select v-model="defaultForm.deptManager" placeholder="请选择负责人" style="width: 80%">
          <el-option v-for="item in deptManagerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="deptInfo" label="部门介绍">
        <el-input
          v-model="defaultForm.deptInfo"
          type="textarea"
          placeholder="1-100个字符"
          :rows="4"
          maxlength="100"
          show-word-limit
          style="width: 80%"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentManager, addDepartment } from '@/api/department'
export default {
  props: {
    // 操作节点 id
    currentNodeId: {
      type: Number,
      default: null
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    // 所有部门数据
    deptData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      deptDialog: {
        title: '新增部门'
      },
      defaultForm: {
        deptName: '',
        deptCode: '',
        deptManager: '',
        deptInfo: '',
        pid: ''
      },
      formRules: {
        deptName: [
          { required: true, message: '部门名称不为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度为 2 到 10 个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.deptData.some(item => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            }
          }
        ],
        deptCode: [
          { required: true, message: '部门编码不为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度为 2 到 10 个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.deptData.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback()
              }
            }
          }
        ],
        deptManager: [{ required: true, message: '部门负责人不为空', trigger: 'blur' }],
        deptInfo: [{ required: true, message: '部门介绍不为空', trigger: 'blur' }]
      },
      deptManagerList: [] // 部门负责人列表
    }
  },
  created() {
    this.getManagerList() // 获取部门负责人列表
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields() // 重置表单
    },
    /** 获取部门负责人列表 */
    async getManagerList() {
      this.deptManagerList = await getDepartmentManager()
    },
    handleSubmit() {
      this.$refs.deptForm.validate(async valid => {
        if (valid) {
          const msg = {
            code: this.defaultForm.deptCode,
            introduce: this.defaultForm.deptInfo,
            name: this.defaultForm.deptName,
            pid: this.currentNodeId,
            managerId: this.defaultForm.deptManager
          }
          await addDepartment(msg)
          this.$emit('updateDepartment') // 通知父组件更新组织列表

          this.$notify({
            title: '提示',
            message: '新增部门成功',
            type: 'success',
            showClose: false,
            duration: 2000
          })
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style></style>
