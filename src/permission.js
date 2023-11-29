/**
 * 路由守卫
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  const hasToken = store.getters.token

  if (hasToken) {
    /** 登录成功 */

    // 访问登录页面，重定向回首页
    if (to.path === '/login') {
      next({ path: '/' })
      // next()里面有地址时，会跳转到地址，不调用后置路由守卫，需要手动关闭进度条
      NProgress.done()
    } else {
      // 访问其他页面，访问前获取(最新)用户信息

      // 判断是否获取过用户信息，通过userInfo里的userId是否存放在getters里来判断
      const hasGetUserInfo = store.getters.userId
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // 登录失败，重定向到登录页面
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 未登录状态下 */

    // 判断是否在白名单中
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 不在白名单的页面全部重定向到登录页面
      next(`/login?redirect=${to.path}`) // next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
