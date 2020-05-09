import Cookies from 'js-cookie'
import sjcl from 'sjcl'
import Config from '../config'

const set = (key: string, value: string): void => {
  Cookies.set(key, sjcl.encrypt(Config.get(['jsExt', 'cookies', 'secretKey']), value), {
    expires: Config.get(['jsExt', 'cookies', 'expires']),
    secure: process.env.NODE_ENV === 'production',
  })
}

const get = (key: string): string | undefined => Cookies.get(key)

const remove = (key: string): void => Cookies.remove(key)

const getDecrypted = (key: string): string | undefined => {
  const value = get(key)
  return value ? sjcl.decrypt(Config.get(['jsExt', 'cookies', 'secretKey']), value) : value
}

export default {
  set,
  get,
  remove,
  getDecrypted,
}
