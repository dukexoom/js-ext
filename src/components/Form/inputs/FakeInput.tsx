import React from 'react'
import { InputComponentProps } from '../interfaces'

const FakeInput: React.FC<InputComponentProps> = ({ field }) => {
  console.error(
    `Component for type=${field.type} is not defined.\
     Plz, add that into corresponding config or implement\
     a corresponding input component in the library\
     field=${field}`
  )
  return <div style={{ color: 'red', fontSize: 'bold' }}>{field.type}</div>
}

export default FakeInput
