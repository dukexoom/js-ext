import React from 'react'
import { InputComponentProps } from '../interfaces'
import FakeInput from './FakeInput'

const Proxy: React.FC<InputComponentProps> = (props) => {
  const Component = props.config.inputs[props.field.type || 'text'] || FakeInput
  return <Component {...props} />
}

export default Proxy
