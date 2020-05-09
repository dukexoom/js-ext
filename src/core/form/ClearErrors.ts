import Dictionary from '../../interfaces/Dictionary'
import _ from 'lodash'
import fp from '../../utils/fp'

const ClearErrors = {
  run: (object: Dictionary<any>): Dictionary<any> | null => {
    if (_.isString(object)) return object
    return _.reduce(
      object,
      (result, value, key) => {
        if (fp.isBlank(value)) return result
        const newValue = handleValue(value)
        return fp.isBlank(newValue) ? result : { ...result, [key]: handleValue(value) }
      },
      {}
    )
  },
}

const handleValue = (value: any): any => {
  if (_.isArray(value)) {
    const newValue = value.map((v) => {
      const compactValue = ClearErrors.run(v)
      return fp.isBlank(compactValue) ? null : compactValue
    })
    return newValue.every((v: any) => fp.isBlank(v)) ? [] : newValue
  }
  if (_.isObject(value)) return ClearErrors.run(value)
  return value
}

export default ClearErrors
