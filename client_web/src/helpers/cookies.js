import Cookies from 'universal-cookie'

import CookieNames from '../res/values/Cookies'

import Paths from '../res/values/Paths'

const cookies = new Cookies()

export function setNewCookie (name, value, expirationTimestamp) {
  let expirationDate = new Date(expirationTimestamp)
  let options = {
    path: Paths.root,
    expires: expirationDate
  }

  cookies.set(name, value, options)
}

export function getCookie (name) {
  return cookies.get(name)
}

export function deleteSession () {
  for (const cookieName of Object.keys(CookieNames)) {
    cookies.remove(CookieNames[cookieName])
  }
}
