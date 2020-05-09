import { ASTNode } from 'graphql'

export interface HandlerMap<T> {
  [key: string]: T
}
export interface Action {
  type: string
  request?: Request
  payload?: object
}

export interface Reducer {
  (state: object, action: Action): object
}

export interface Request {
  query: ASTNode
  variables: object
  multi?: boolean
}
