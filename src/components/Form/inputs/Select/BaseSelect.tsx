import React from 'react'
import _ from 'lodash'
import { InputComponentProps } from '../../interfaces'
import FakeInput from '../FakeInput'

// TODO (mikhail): use FP component
class BaseSelect extends React.Component<InputComponentProps, {}> {
  getValue = (): any => {
    const { value } = this.props
    if (_.isArray(value) && value.every((v) => _.isObject(v))) {
      return value.map((v) => v.id)
    }

    // TODO (atanych): remove the line below if select will work properly
    // if (_.isObject(value) && value.value) return value.value

    return value
  }

  render(): any {
    const Component = this.props.config.inputs[this.props.field.type] || FakeInput

    return <Component {...this.props} value={this.getValue()} options={this.props.field.options} />
  }
}

export default BaseSelect
