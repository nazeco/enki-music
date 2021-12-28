import { settingService as request } from '@/utils/request'

export function loginAccount(params:object) {
  return request({
    url: '/user/doLogin',
    method: 'get',
    params
  })
}

export function registerAccount(params:object) {
  return request({
    url: '/user/register',
    method: 'get',
    params
  })
}

export function logoutAccount() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function isUserLogin() {
  return request({
    url: '/user/isLogin',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function updateUserInfo(data:object) {
  return request({
    url: '/user/updateInfo',
    method: 'post',
    data
  })
}