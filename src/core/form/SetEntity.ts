import { Field } from '../../components/Form/interfaces'
import Dictionary from '../../interfaces/Dictionary'
import { getIn, setIn } from '../../utils/fp'
import v4 from 'uuid/v4'
import _ from 'lodash'
import Form from '../../utils/form'

interface GetValueParams {
  result: Dictionary<any>
  field: Field
  value: any
  actionType: 'edit' | 'new'
}

const SetEntity = {
  run: (
    fields: Field[],
    actionType: 'edit' | 'new',
    entity: Dictionary<any> = {},
    parentPath: string | undefined = undefined
  ): Dictionary<any> => {
    return fields.reduce((result, field) => {
      const { name } = field
      const fullPath = parentPath ? `${parentPath}.${name}` : name

      let value = getIn(entity, fullPath)

      value =
        field.fields && !field.type?.includes('[]')
          ? SetEntity.run(field.fields, actionType, entity, fullPath)
          : getValue({ result, field, value, actionType })

      return [null, undefined].includes(value) ? result : setIn(result, name, value)
    }, {} as Dictionary<any>)
  },
}

const getValue = (params: GetValueParams): any => (params.value ? normalizeValue(params) : getDefaultValue(params))

const getDefaultValue = ({
  field: { allowEmpty, multiple, options, type, defaultValue },
  field,
  result,
  actionType,
}: GetValueParams): any => {
  if (type?.includes('[]')) return []
  if (!Form.isAvailable(field, result, actionType)) return
  if (![null, undefined].includes(defaultValue)) return defaultValue
  if (allowEmpty) return

  if (_.isArray(options) && _.isObject(options[0])) {
    return multiple ? [] : options[0]?.value
  }
}

const normalizeValue = ({ field: { fields, type, multiple, async }, value, actionType }: GetValueParams): any => {
  if (type?.includes('[]')) return normalizedJSONList(fields, value, actionType)

  if (async) return value

  if (multiple && value?.every((v: any) => _.isObject(v))) {
    return value.map((v: { id: string | number }) => v.id)
  }

  return value
}

const normalizedJSONList = (fields: Field[] | undefined, values: any[], actionType: 'edit' | 'new'): any[] => {
  if (fields) {
    return values.map((v: {}) => ({ ...SetEntity.run(fields, actionType, v), __uuid: v4() }))
  } else {
    return values.map((v: {}) => ({ ...v, __uuid: v4() }))
  }
}

export default SetEntity
