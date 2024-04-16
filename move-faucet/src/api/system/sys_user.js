import request from '@/utils/request';

const BASE_API = '/web/api/system/user';

export default {
  getCaptcha() {
    return request({
      url: '/captcha?t=' + new Date().getTime().toString(),
      method: 'get',
    });
  },
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
      // headers: {
      //   // 
      //   Authorization: 'Basic d2ViOjEyMzQ1Ng==',
      // },
    });
  },
  logout() {
    return request({
      url: '/auth/logout',
      method: 'delete',
    });
  },
  getUserPerm() {
    return request({
      url: '/web/api/system/perm/getUserPerm',
      method: 'get',
      // params: { systemSource: 0 }
    });
  },
  listPage(query, headers) {
    return request({
      url: BASE_API + '/listPage',
      method: 'get',
      params: query,
      headers,
    });
  },
  add(data) {
    return request({
      url: BASE_API,
      method: 'post',
      data,
    });
  },
  update(data) {
    return request({
      url: BASE_API,
      method: 'put',
      data,
    });
  },
  delete(id) {
    return request({
      url: BASE_API,
      method: 'delete',
      params: { userId: id },
    });
  },
  updateStatus(id, status) {
    return request({
      url: BASE_API + '/updateStatus',
      method: 'post',
      data: { userId: id, status: status },
    });
  },
  resetPassword(data) {
    return request({
      url: BASE_API + '/resetPassword',
      method: 'get',
      params: data,
    });
  },
  getUserInfoById(userId) {
    return request({
      url: BASE_API + '',
      method: 'get',
      params: {
        userId: userId,
      },
    });
  },
  saveRoleIds(data) {
    return request({
      url: BASE_API + '/saveRoleIds',
      method: 'post',
      data: data,
    });
  },
  updatePassword(data) {
    return request({
      url: BASE_API + '/updatePassword',
      method: 'put',
      data: data,
    });
  },
};
