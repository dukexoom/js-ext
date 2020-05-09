import React from 'react'
import { Event, Field, Config } from '../interfaces'
import InputList from '../InputList'
import Dictionary from '../../../interfaces/Dictionary'
import inputs from '../inputs'
import FakeInput from '../inputs/FakeInput'

interface Props {
  actionType: 'edit' | 'new'
  value: any
  layout: 'horizontal' | 'vertical'
  grid?: Dictionary<any>
  onChange: (event: Event) => void
  success: boolean
  errors: Dictionary<any>
  field: Field
  config: Config
  id?: number
}

const InputRow: React.FC<Props> = (props) => {
  const {
    field: { type = 'text', component, label, requiredPermissions },
    field,
    value,
    config,
  } = props

  if (type.includes('[]')) {
    return <InputList {...props} values={value} field={field} />
  }

  const hasLabel = (): boolean => {
    if (!label) return false
    if (type === 'checkbox') return false

    return true
  }

  if (
    requiredPermissions &&
    requiredPermissions.length &&
    config.hasPermission &&
    !config.hasPermission(requiredPermissions[0])
  )
    return null

  const Input = component || inputs[type] || FakeInput
  return <config.InputRow {...props} Input={Input} hasLabel={hasLabel()} />
}

export default InputRow
