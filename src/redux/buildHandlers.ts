import _ from 'lodash'
import { HandlerMap, Reducer } from './interfaces'

export default function buildHandlers(handlers: HandlerMap<Reducer>): HandlerMap<Reducer> {
  return _.reduce(
    handlers,
    (result: HandlerMap<Reducer>, value: Reducer, keyString: string): HandlerMap<Reducer> => {
      keyString.split(',').map((key) => (result[key] = value))
      return result
    },
    {}
  )
}
