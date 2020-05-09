import _ from 'lodash'
import fp from './fp'
import Config from '../config'

const DEFAULT_NAMESPACE = 'dashCache'

// ToDo (mikhail): change to FP
class LocalStorage {
  private values: {}
  constructor() {
    this.values = {}
  }

  getIn(path: string | string[]): object {
    if (!Array.isArray(path)) {
      path = path.split('.')
    }
    this.values = JSON.parse(localStorage.getItem(Config.get(['jsExt', 'namespace'], DEFAULT_NAMESPACE)) || '')
    return fp.getIn(this.values, path)
  }

  setIn(path: string | string[], value: any): void {
    if (!Array.isArray(path)) {
      path = path.split('.')
    }
    this.values = fp.setIn(this.values, path, value)
    this.values = _.mergeWith(
      JSON.parse(localStorage.getItem(Config.get(['jsExt', 'namespace'], DEFAULT_NAMESPACE)) || '') || {},
      this.values,
      (oldVal, newVal) => newVal
    )
    localStorage.setItem(Config.get(['jsExt', 'namespace'], DEFAULT_NAMESPACE), JSON.stringify(this.values))
  }
}

export default new LocalStorage()
