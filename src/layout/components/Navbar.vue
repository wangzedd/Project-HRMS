<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-container">
        <img v-if="avatar" :src="avatar" class="user-avatar">
        <span v-else class="user-name-avatar">{{ userName | nameFormat }}</span>
        <span class="user-name">{{ userName }}</span>
      </div>
      <el-dropdown class="dropdown-container" trigger="click">
        <span><i class="el-icon-setting" /></span>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="modifyPassword">
            <span>修改密码</span>
          </el-dropdown-item>
          <a target="_blank" href="https://github.com/wangzedd/Project-HRMS">
            <el-dropdown-item>仓库地址</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <!-- native 注册组件根元素的原生事件 -> el-dropdown-item没有click事件 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码弹窗 -->
    <!-- 页面中脱离文档标准流的布局(float、fixed、absolute等)会导致遮罩层作用层级问题
      modal-append-to-body来对遮罩层的作用层级进行设置，false时则遮罩层会插入至 Dialog 的父元素上
    -->
    <el-dialog title="修改密码" :visible.sync="modifyPasswordDialogVisible" width="50%" :modal-append-to-body="false" :before-close="handleClose">
      <el-form ref="modifyPasswordForm" :model="modifyPasswordForm" label-width="100px" :rules="modifyPasswordFormRules">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="modifyPasswordForm.oldPassword" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="modifyPasswordForm.newPassword" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPasswordAgain">
          <el-input v-model="modifyPasswordForm.newPasswordAgain" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleModifyPwd">确认修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  filters: {
    // 对没有头像的用户姓名进行格式化，展示名字首个汉字
    nameFormat(value) {
      if (value) {
        const str = value.replace('黑马', '')
        const newVal = str?.charAt(0) // 可选链'?.' 如果str不存在，则返回undefined，不继续往后执行
        if (newVal) {
          return newVal
        }
      }
    }
  },
  data() {
    /** 自定义校验 - 确认新密码 */
    const confirmPassword = (rule, value, callback) => {
      // 采用箭头函数形式，才能使得this指向实例对象
      if (!value) {
        return callback(new Error('请确认新密码'))
      } else if (value !== this.modifyPasswordForm.newPassword) {
        callback(new Error('两次输入的新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      modifyPasswordDialogVisible: false,
      modifyPasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      modifyPasswordFormRules: {
        oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newPasswordAgain: [
          { required: true, validator: confirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userName'
    ])
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    /** 登出 */
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    /** 修改密码 */
    modifyPassword() {
      this.modifyPasswordDialogVisible = true
    },
    /** 确认修改 */
    handleModifyPwd() {
      this.$refs.modifyPasswordForm.validate(async val => {
        if (val) {
          await updatePassword(this.modifyPasswordForm)
          this.$notify({
            title: '提示',
            message: '修改成功',
            type: 'success',
            showClose: false,
            duration: 2000
          })
          this.handleClose()
        }
      })
    },
    /** 关闭修改密码弹窗 */
    handleClose() {
      this.modifyPasswordDialogVisible = false
      this.$refs.modifyPasswordForm.resetFields() // 重置表单
    }

  }
}
</script>

<style lang="scss" scoped>

// 随机生成背景色
$random-bg-color: rgb(random(256),random(256),random(256));

.navbar {
  height: 50px;
  overflow: hidden;
  // position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 20px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .user-name-avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: $random-bg-color;
          border-radius: 50%;
          color: #fff;
          font-size: 20px;
        }
        .user-name {
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
    .dropdown-container {
      margin-right: 20px;
      .el-icon-setting {
          cursor: pointer;
          vertical-align: middle;
          font-size: 20px;
        }
    }
  }
</style>
