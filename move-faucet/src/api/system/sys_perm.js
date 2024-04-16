import request from '@/utils/request'

const BASE_API = '/web/api/system/perm'

export default {
  saveRoleRePermIds(data) {
    return request({
      url: BASE_API + '/saveRoleRePermIds',
      method: 'post',
      data,
    })
  },
  saveRoleRePerm(data) {
    return request({
      url: BASE_API + '/saveRoleRePerm',
      method: 'post',
      data,
    })
  },
  // saveRolePermission(data) {
  //   return request({
  //     url: BASE_API + '/saveRolePermission',
  //     method: 'post',
  //     data,
  //   })
  // },
}
