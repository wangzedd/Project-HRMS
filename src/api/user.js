import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: 'sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: 'sys/profile',
    method: 'GET'
  })
}

// 修改用户密码
export function updatePassword(data) {
  return request({
    url: 'sys/user/updatePass',
    method: 'PUT',
    data
  })
}
