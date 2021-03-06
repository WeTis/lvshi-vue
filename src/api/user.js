import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/loginUser',
    method: 'post',
    data
  })
}

/**
 * 获取管理员列表
 */
export function getAdminList(params){
  return request({
    url: '/user/manageUserList',
    method: 'post',
    params
  })
}


export function manageAdmin(params){
  return request({
    url: '/user/manageUser',
    method: 'post',
    params
  })
}

export function updateAdmin(params){
  return request({
    url: '/user/manageUser',
    method: 'post',
    params
  })
}

export function getOrderList(params){
  return request({
    url: '/user/getOrderList',
    method: 'post',
    params
  })
}

export function getLawyerList(params){
  return request({
    url: 'user/getAllLawyerList',
    method: 'post',
    params
  })
}

export function setLaywer(params){
  return request({
    url: '/user/manageLawyer',
    method: 'post',
    params
  })
}

export function getArticle(params){
  return request({
    url: '/user/BannerList',
    method: 'post',
    params
  })
}

export function updateArticle(params){
  return request({
    url: '/user/mangeBanner',
    method: 'post',
    params
  })
}

export function addArticle(params){
  return request({
    url: '/user/toBanner',
    method: 'post',
    params
  })
}

export function delArticle(params){
  return request({
    url: '/user/deleteBanner',
    method: 'post',
    params
  })
}

export function downLoad(data){
  return request({
    url: '/user/exportOrderExcel',
    method: 'get',
    data
  })
}













export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function changeInfoApi(params) {
  return request({
    url: '/user/updateLawyer',
    method: 'post',
    params
  })
}

export function getLanguageList(params) {
  return request({
    url: 'user/getLanguageList',
    method: 'post',
    params
  })
}

export function setLanguage(params) {
  return request({
    url: 'user/language',
    method: 'post',
    params
  })
}

export function insertCoupon(data) {
  return request({
    url: 'user/insertCoupon',
    method: 'POST',
    data
  })
}

export function getAllCouponList(params) {
  return request({
    url: 'user/getAllCouponList',
    method: 'POST',
    params
  })
}
