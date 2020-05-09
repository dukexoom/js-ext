import buildHandlers from '../../src/redux/buildHandlers'

test('redux buildHandler', (): void => {
  const a = 'q'
  const b = 'w'
  const c = 'e'
  const d = 'r'

  const reducer1 = (a: object): object => a
  const reducer2 = (a: object): object => a

  const handlers = { [`${a},${b},${d}`]: reducer1, [c]: reducer2 }

  expect(buildHandlers(handlers)).toEqual({ q: reducer1, w: reducer1, e: reducer2, r: reducer1 })
})
