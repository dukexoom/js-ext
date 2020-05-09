import React from 'react'
import _ from 'lodash'
import { InputComponentProps } from '../interfaces'
import FakeInput from './FakeInput'

const JSON: React.FC<InputComponentProps> = (props) => {
  const {
    onChange,
    value,
    config,
    field: { name, defaultValue, type },
  } = props

  const handleChange = (v: any): void => {
    onChange({ target: { value: isArray() ? v : { ...v, __uuid: value?.__uuid }, name } })
  }

  const isArray = (): boolean => _.isArray(defaultValue)

  const getValue = (): any => {
    if (isArray()) return value || defaultValue
    return _.omit(value || defaultValue, ['__uuid'])
  }

  const Component = config.inputs[type] || FakeInput

  return <Component {...props} value={getValue()} onChange={handleChange} />
}

export default JSON
