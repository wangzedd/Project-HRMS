import request from '@/utils/request'

// 获取组织架构列表
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
