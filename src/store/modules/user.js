import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 获取默认token
const getDefaultState = () => {
  return {
    token: getToken()
  }
}

const state = {
  ...getDefaultState(),
  userInfo: {} // 用户基本信息
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
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

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
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

