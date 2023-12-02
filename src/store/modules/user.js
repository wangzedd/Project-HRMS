import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 默认token和用户基本信息
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {} // 用户基本信息
  }
}

const state = {
  ...getDefaultState()
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState()) // 重置state
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  /**
   * 用户登录
   * @param {content} content 上下文
   * @param {userInfo} userInfo 传入参数(用户登录信息)
   */
  // 写法一：
  async login({ commit }, userInfo) {
    const token = await login(userInfo)
    commit('SET_TOKEN', token)
    setToken(token)
  },
  // 写法二：
  // login({ commit }, userInfo) {
  //   return new Promise((resolve, reject) => {
  //     login(userInfo).then(res => {
  //       const data = res
  //       commit('SET_TOKEN', data)
  //       setToken(data)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  /** 获取用户信息 */
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        const userInfo = res
        commit('SET_USER_INFO', userInfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 用户登出
   * 没调用接口，直接清除token
   */
  logout({ commit, state }) {
    removeToken() // 先移除token
    resetRouter()
    commit('RESET_STATE')
  },

  /**
   * 重置token及用户信息
   */
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 先移除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

