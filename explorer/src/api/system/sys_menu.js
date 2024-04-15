import request from '@/utils/request'

const BASE_API = '/web/api/system/menu'

export default {
  menuTree(params) {
    return request({
      url: BASE_API + '/menuTree',
      method: 'get',
      params: params,
    })
  },
  add(data) {
    return request({
      url: BASE_API,
      method: 'post',
      data,
    })
  },
  update(data) {
    return request({
      url: BASE_API,
      method: 'put',
      data,
    })
  },
  delete(menuId) {
    return request({
      url: BASE_API,
      method: 'delete',
      params: {
        menuId: menuId,
      },
    })
  },
  
  getPermListByMenuId(id) {
    return request({
      url: BASE_API + '/getPermListByMenuId',
      method: 'get',
      params: {
        menuId: id,
      },
    })
  },
  deleteMenuReBtnPerm(id) {
    return request({
      url: BASE_API + '/deleteMenuReBtnPerm',
      method: 'delete',
      params: {
        id: id,
      },
    })
  },
  addMenuReBtnPerm(data) {
    return request({
      url: BASE_API + '/addMenuReBtnPerm',
      method: 'post',
      data,
    })
  },
  updateMenuReBtnPerm(data) {
    return request({
      url: BASE_API + '/updateMenuReBtnPerm',
      method: 'put',
      data,
    })
  },
}
