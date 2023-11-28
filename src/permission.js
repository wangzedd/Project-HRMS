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
    // 登录成功状态下，点击登录页面，重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
      // next()里面有地址时，会跳转到地址，不调用后置路由守卫，需要手动关闭进度条
      NProgress.done()
    } else {
      next()
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
