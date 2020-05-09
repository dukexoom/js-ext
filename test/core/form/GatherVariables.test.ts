import GatherVariables from '../../../src/core/form/GatherVariables'
import Form from '../../../src/components/Form'

test('run', (): void => {
  Object.defineProperty(window, 'location', {
    value: {
      search: '?user_id=1',
    },
  })

  const variables = {
    name: 'Test',
    json: { type: 'test' },
  }

  const context: Form = {
    // @ts-ignore
    props: {
      entity: { id: 1 },
      association: 'user',
    },
    shouldBeStringified: (key: string): boolean => key === 'json',
    getField: () => ({ name: 'text', type: 'text' }),
  }
  expect(GatherVariables.run(variables, context)).toEqual({
    id: 1,
    entity: { name: 'Test', json: '{"type":"test"}' },
    parentId: 1,
  })
})
