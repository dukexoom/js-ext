import React from 'react'
import { InputComponentProps } from '../../interfaces'
import FakeInput from '../FakeInput'

// TODO (mikhail): use FP component
class AsyncSelect extends React.Component<InputComponentProps, {}> {
  render(): any {
    const Component = this.props.config.inputs.asyncSelect || FakeInput

    return <Component {...this.props} />
  }
}

export default AsyncSelect
