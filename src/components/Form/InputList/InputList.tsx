import React from 'react'
import v4 from 'uuid/v4'
import { Field, Event, Config } from '../interfaces'
import _ from 'lodash'
import InputRow from '../InputRow'
import SetEntity from '../../../core/form/SetEntity'
import Dictionary from '../../../interfaces/Dictionary'

interface Props {
  actionType: 'edit' | 'new'
  success: boolean
  errors: Dictionary<any>
  config: Config
  values: Value[]
  layout: 'horizontal' | 'vertical'
  name?: string
  onChange: (event: Event) => void
  field: Field
}

interface Value {
  [key: string]: any
  __uuid: string
}

// TODO (mikhail): use FP component
class InputList extends React.Component<Props, {}> {
  add = (): void => {
    const {
      field: { fields },
    } = this.props
    const entity = fields ? SetEntity.run(fields, this.props.actionType) : {}
    this.handleChange([{ __uuid: v4(), ...entity }, ...this.props.values])
  }

  remove = ({ __uuid }: Value): void => this.handleChange(this.props.values.filter((v) => v.__uuid !== __uuid))

  handleChange = (value: Value[]): void => {
    this.props.onChange({ target: { name: this.getFullName(), value } })
  }

  getFullName = (): string => (this.props.name ? `${this.props.name}.${this.props.field.name}` : this.props.field.name)

  hasLabel = (): boolean => !!this.props.field.label

  renderRow = (field: Field, index: number, extra = {}): any => {
    return (
      <InputRow
        key={index}
        {...this.props}
        field={{
          ...field,
          name: `${this.getFullName()}.${index}`,
          label: this.hasLabel() ? undefined : field.label,
        }}
        grid={{ input: 9, right: 0, label: 3 }}
        value={this.props.values[index]}
        errors={this.props.errors && this.props.errors[index]}
        {...extra}
      />
    )
  }

  render(): any {
    const { layout, values, onChange, field, config, errors } = this.props

    return (
      <config.InputList
        layout={layout}
        renderRow={this.renderRow}
        field={{ ...field, type: _.trim(field.type, '[]') }}
        hasLabel={this.hasLabel()}
        values={values || []}
        name={this.getFullName()}
        onChange={onChange}
        onAdd={this.add}
        onRemove={this.remove}
        errors={errors}
      />
    )
  }
}

export default InputList
