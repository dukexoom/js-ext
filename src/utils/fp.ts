import { get } from 'lodash'
import { set } from 'lodash/fp'
import _ from 'lodash'

export const getIn = (object: any, path: any): any => get(object, path)
export const setIn = (object: any, path: any, value: any): any => set(path, value, object)

export const isBlank = (value: any): boolean => (_.isObject(value) && _.isEmpty(value)) || !value

export default {
  getIn,
  setIn,
  isBlank,
}
