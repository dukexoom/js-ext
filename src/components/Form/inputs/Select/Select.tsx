import React from 'react'
import AsyncSelect from './AsyncSelect'
import BaseSelect from './BaseSelect'
import { InputComponentProps } from '../../interfaces'

const Select: React.FC<InputComponentProps> = (props) => {
  const {
    field: { async },
  } = props

  if (async) return <AsyncSelect {...props} />
  return <BaseSelect {...props} />
}

export default Select
