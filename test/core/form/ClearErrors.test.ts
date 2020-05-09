import ClearErrors from '../../../src/core/form/ClearErrors'
import Dictionary from '../../../src/interfaces/Dictionary'

describe('compact', () => {
  test('expect empty object', (): void => {
    const object: Dictionary<any> = { a: { b: null, c: null, d: [{ e: null }, null] } }

    expect(ClearErrors.run(object)).toStrictEqual({})
  })

  test('simple object', (): void => {
    const object: Dictionary<any> = { e: null, f: 1 }

    expect(ClearErrors.run(object)).toStrictEqual({ f: 1 })
  })

  test('simple array', (): void => {
    const object: Dictionary<any> = { e: ['Test error'] }

    expect(ClearErrors.run(object)).toStrictEqual({ e: ['Test error'] })
  })

  test('expect not empty object', (): void => {
    const object: Dictionary<any> = { a: { b: null, c: null, d: [{ e: null, f: ['Test error'] }, { g: null }] } }

    expect(ClearErrors.run(object)).toStrictEqual({ a: { d: [{ f: ['Test error'] }, null] } })
  })
})
