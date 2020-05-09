import _ from 'lodash'
import Dictionary from '../interfaces/Dictionary'

declare global {
  interface Window {
    jsExtConfig: Dictionary<any>
  }
}

window.jsExtConfig = window.jsExtConfig || {}

const set = (newConfig: Dictionary<any>): Dictionary<any> => (window.jsExtConfig = newConfig)

const setIn = (path: string | string[], value: any): Dictionary<any> => _.set(window.jsExtConfig, path, value)

const get = (path: string | string[], defaultValue?: any): any => _.get(window.jsExtConfig, path, defaultValue)

export default {
  set,
  setIn,
  get,
}
