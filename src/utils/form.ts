import _ from 'lodash'
import { Field, Event } from '../components/Form/interfaces'
import { Dictionary } from '../index'
import handlers from '../components/Form/handlers'
import fp from './fp'
import Form from '../components/Form'
import ClearErrors from '../core/form/ClearErrors'

const isAvailable = ({ availableIf }: Field, value: Dictionary<any>, actionType: 'edit' | 'new'): boolean => {
  if (!availableIf) return true
  return availableIf(value || {}, actionType)
}

const getFieldByName = (name: string, fields: Field[]): Field => {
  const [first, ...rest] = name.split('.')

  if (_.toNumber(first) || _.toNumber(first) === 0) {
    return getFieldByName(rest.join('.'), fields)
  }
  const field = fields.find((field) => field.name === name || field.name === first)

  if (!field) {
    throw new Error(`The field is not found for name ${name}. Check settings`)
  }

  if (rest.length) {
    return field.fields ? getFieldByName(rest.join('.'), field.fields) : field
  }
  return field
}

const changeHandler = ({ target }: Event, fields: Field[], context: Form): void => {
  const field = getFieldByName(target.name, fields)
  const handler = handlers[field.type] || handlers.text
  context.setState((state: Dictionary<any>) => {
    const newState = fp.setIn(state, `entity.${target.name}`, handler(target))
    const errors = fp.setIn(newState.errors, target.name, null)
    return fp.setIn(newState, `errors`, ClearErrors.run(errors))
  })
}

export default {
  isAvailable,
  changeHandler,
}
