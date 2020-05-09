import Form from '../../src/utils/form'
import { Field } from '../../src/components/Form/interfaces'

describe('Form', function() {
  test('isAvailable is not filled', (): void => {
    const field: Field = {
      name: 'name',
      type: 'type',
    }

    expect(Form.isAvailable(field, { any: true }, 'edit')).toEqual(true)
  })

  test('isAvailable (value is valid)', (): void => {
    const field: Field = {
      name: 'name',
      type: 'type',
      availableIf: ({ type }) => type === 'main',
    }

    expect(Form.isAvailable(field, { type: 'main' }, 'edit')).toEqual(true)
  })

  test('isAvailable (value is invalid)', (): void => {
    const field: Field = {
      name: 'name',
      type: 'type',
      availableIf: ({ type }) => type === 'main',
    }

    expect(Form.isAvailable(field, { type: 'additional' }, 'edit')).toEqual(false)
  })

  test('isAvailable (actionType is valid)', (): void => {
    const field: Field = {
      name: 'name',
      type: 'type',
      availableIf: (_value, actionType) => actionType === 'new',
    }

    expect(Form.isAvailable(field, { type: 'additional' }, 'new')).toEqual(true)
  })
})
