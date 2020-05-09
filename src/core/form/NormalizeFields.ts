import { Field } from '../../components/Form/interfaces'
import { Option } from '../../components/Form/interfaces/Field'

const normalizeFields = (fields: Field[]): Promise<any> => {
  return Promise.all(
    fields.map(async (field) => {
      if (field.fields) return { ...field, fields: await normalizeFields(field.fields) }
      if (!field.options) return field
      if (typeof field.options === 'function') {
        const opts = await field.options()
        return { ...field, options: normalizeOptions(opts) }
      } else {
        return { ...field, options: normalizeOptions(field.options) }
      }
    })
  )
}

const normalizeOptions = (options: (Option | string)[]): Option[] => {
  if (!options) return []

  return options.map(
    (option: string | Option): Option => {
      if (typeof option === 'string') {
        return { value: option, label: option }
      }
      return option
    }
  )
}

export default { run: normalizeFields }
