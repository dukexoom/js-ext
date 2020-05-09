import React from 'react'
import _ from 'lodash'
import { getIn } from '../../utils/fp'
import { normalize, isGraphQLError } from '../../utils/errors'
import FormUtils from '../../utils/form'
import { Event, Settings, Config as IConfig } from './interfaces'
import Dictionary from '../../interfaces/Dictionary'
import Config from '../../config'
import InputRow from './InputRow'
import SetEntity from '../../core/form/SetEntity'
import NormalizeFields from '../../core/form/NormalizeFields'
import GatherVariables from '../../core/form/GatherVariables'
import Field from './interfaces/Field'

const STRINGIFIED_TYPES = ['smartJSON', 'json']

export interface Props {
  config?: IConfig
  settings: Settings
  entity: Dictionary<any>
  customButtons: (context: { onSubmit: () => void }) => React.FC<any>
  type: 'new' | 'edit'
  association: string
  amendVariables?: (vars: Dictionary<any>) => Dictionary<any>
  onSuccess?: () => Promise<any>
  onChange: (entity: any) => Promise<any>
  onSubmit: (vars: Dictionary<any>) => Promise<any>
}

// TODO (atanych): use FP component after reducing multiple updates of state
class Form extends React.Component<Props, { errors?: Dictionary<any>; settings: Settings; entity: Dictionary<any> }> {
  constructor(props: Props) {
    super(props)

    this.state = { settings: { ...props.settings, fields: [] }, entity: {} }
  }

  componentDidMount(): void {
    NormalizeFields.run(this.props.settings.fields).then((fields) => {
      const settings = { ...this.props.settings, fields }

      const entity = SetEntity.run(settings.fields, this.props.type, this.props.entity)

      this.setState({ settings, entity })
    })
  }

  onChange = (event: Event): void => {
    FormUtils.changeHandler(event, this.state.settings.fields, this)
    this.props.onChange && this.props.onChange(this.state.entity)
  }

  getField = (name: string): Field | undefined => this.state.settings.fields.find((field) => field.name === name)

  shouldBeStringified = (name: string): boolean => {
    const field = this.getField(name)
    if (!field?.type) return false
    if (field.type.includes('[]')) return true
    return STRINGIFIED_TYPES.includes(field.type)
  }

  removeUUID = (variables: any): Dictionary<any> => {
    if (_.isArray(variables)) {
      return variables.map((b) => {
        return this.removeUUID(_.isPlainObject(b) ? _.omit(b, ['__uuid']) : b)
      })
    }
    if (variables instanceof File) {
      return variables
    }
    if (_.isObject(variables)) {
      return _.reduce(variables, (res, branch, key) => ({ ...res, [key]: this.removeUUID(branch) }), {})
    }
    return variables
  }

  onSubmit = (): void => {
    const { onSubmit, amendVariables, onSuccess } = this.props
    let variables = _.reduce(this.state.entity, (res, branch, key) => ({ ...res, [key]: this.removeUUID(branch) }), {})
    variables = GatherVariables.run(variables, this)
    variables = amendVariables ? amendVariables(variables) : variables

    onSubmit({ variables })
      .catch((error: any) => {
        if (isGraphQLError(error) && error.message.length > 0) {
          this.setState({ errors: normalize(error.message, this.state.settings.fields) })
        }
      })
      .then((res: any) => {
        if (res) {
          onSuccess ? onSuccess() : window.history.back()
        }
      })
  }

  getValue(value: any): any {
    if (value === 0 || value === false || value) return value
    return ''
  }

  render(): any {
    const Component = this.props.config?.Form || Config.get(['jsExt', 'form', 'Form']) // eslint-disable-line
    const errors = this.state.errors || {}
    const settings = { ...this.state.settings, layout: this.state.settings.layout || 'horizontal' }

    return (
      <Component
        {...this.props}
        errors={errors}
        onSubmit={this.onSubmit}
        state={this.state}
        settings={settings}
        onChange={this.onChange}
      >
        {this.state.settings.fields.map((field) => {
          const value = getIn(this.state.entity, field.name)
          return (
            <InputRow
              actionType={this.props.type}
              config={this.props.config || Config.get(['jsExt', 'form'])}
              errors={errors[field.name]}
              field={field}
              id={this.props.entity.id}
              key={field.name.toString()}
              layout={settings.layout}
              onChange={this.onChange}
              success={false}
              value={this.getValue(value)}
            />
          )
        })}
      </Component>
    )
  }
}

export default Form
