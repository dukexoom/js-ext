import React from 'react'
import { InputComponentProps } from '../interfaces'

const Hidden: React.FC<InputComponentProps> = (props) => {
  const {
    value,
    field: { type },
  } = props

  return <input type={type} value={value} />
}

export default Hidden
