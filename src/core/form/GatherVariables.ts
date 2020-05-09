import Dictionary from '../../interfaces/Dictionary'
import queryString from 'query-string'
import _ from 'lodash'
import Form from '../../components/Form'
import Field from '../../components/Form/interfaces/Field'

const normalizeValue = (value: any, field: Field | undefined, shouldBeStringified: boolean): any => {
  if (shouldBeStringified) return JSON.stringify(value)

  // perform value from AsyncSelect component. Value from this component returned as { value: "value", label: "label" }
  if (_.isArray(value) && _.every(value, (v) => _.has(v, 'value'))) return value.map((v) => v.value)

  // perform value from Image component. From server we get value as url string. And if we don't change image it necessary to remove this url from entity
  if (field?.type === 'image' && typeof value === 'string') return

  return value
}

export default {
  run: (vars: Dictionary<any>, context: Form): Dictionary<any> => {
    const { entity, association } = context.props
    const getParams = queryString.parse(window.location.search)

    const normalizedEntity = _.reduce(
      vars,
      (sum, value, key) => ({
        ...sum,
        [key]: normalizeValue(value, context.getField(key), context.shouldBeStringified(key)),
      }),
      {}
    )

    const variables = {
      id: entity.id,
      entity: normalizedEntity,
    }

    const parentId = parseInt(getParams[`${association}_id`] as string)

    return parentId ? { ...variables, parentId } : variables
  },
}
