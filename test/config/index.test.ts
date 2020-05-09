import Config from '../../src/config'

describe('Config', function() {
  beforeEach(() => {
    const config = {
      prop1: 10,
      prop2: {
        prop3: 'test',
      },
    }
    Config.set(config)
  })

  test('set', (): void => {
    const config = { prop: 1 }
    expect(Config.set(config)).toEqual({ prop: 1 })
  })

  test('setIn', (): void => {
    expect(Config.setIn(['prop2', 'prop3'], 11)).toEqual({ prop1: 10, prop2: { prop3: 11 } })
    expect(Config.setIn('prop2', 'test')).toEqual({ prop1: 10, prop2: 'test' })
    expect(Config.setIn(['prop3', 'prop4'], [1, 2])).toEqual({ prop1: 10, prop2: 'test', prop3: { prop4: [1, 2] } })
  })

  test('get', (): void => {
    expect(Config.get('prop1', 11)).toEqual(10)
    expect(Config.get(['prop2', 'prop3'])).toEqual('test')
    expect(Config.get('prop4', 12)).toEqual(12)
    expect(Config.get('prop4')).toBeUndefined()
  })
})
