import request from '@/utils/request'

// 获取组织架构列表
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

// 获取部门负责人
export function getDepartmentManager() {
  return request({
    url: 'sys/user/simple',
    method: 'get'
  })
}

// 新增组织
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
