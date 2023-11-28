import Cookies from 'js-cookie'

const TokenKey = 'Project_token'

export function getToken() {
  // console.log(1, Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
