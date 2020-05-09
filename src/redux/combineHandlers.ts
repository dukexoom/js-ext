import buildHandlers from './buildHandlers'
import { Action, HandlerMap, Reducer } from './interfaces'

const combineHandlers = (handlers: HandlerMap<Reducer>, defaultState: object): object => {
  return function reducer(state: object = defaultState, action: Action): object {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
  }
}

export default function(handlers: HandlerMap<Reducer>, defaultState: object): object {
  return combineHandlers(buildHandlers(handlers), defaultState)
}
