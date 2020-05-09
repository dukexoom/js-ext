import React from 'react'
import _ from 'lodash'
import { InputComponentProps, Field } from '../interfaces'
import FakeInput from './FakeInput'
import Form from '../../../utils/form'
import InputRow from '../InputRow'
import fp from '../../../utils/fp'

class SmartJSON extends React.Component<InputComponentProps, { activeField: number }> {
  state = {
    activeField: 0,
  }

  getFields = (): Field[] => {
    const {
      field: { fields = [], name },
      value,
      actionType,
    } = this.props

    return fields.reduce((result: Field[], f: Field) => {
      if (Form.isAvailable(f, value, actionType)) {
        return [...result, { ...f, name: `${name}.${f.name}` }]
      }
      return result
    }, [])
  }

  renderRow = (field: Field, extra = {}): any => {
    const nameList = field.name.split('.')

    const fieldValue = nameList.length === 1 ? field.name : fp.getIn(this.props.value, _.last(nameList) as string)

    const fieldError = fp.getIn(this.props.errors, _.last(nameList))

    return <InputRow {...this.props} field={field} value={fieldValue} errors={fieldError} {...extra} />
  }

  render(): any {
    const {
      config,
      field,
      field: { type },
    } = this.props
    const Component = config.inputs[type] || FakeInput

    return (
      <Component
        {...this.props}
        field={{ ...field, fields: this.getFields() }}
        activeField={this.state.activeField}
        setActiveField={(activeField: number): void => this.setState({ activeField })}
        renderRow={this.renderRow}
      />
    )
  }
}

export default SmartJSON
