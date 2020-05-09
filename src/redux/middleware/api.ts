import { GraphQLError } from 'graphql'
import GQLFetch from '../../core/gql/Fetch'
import { Action } from '../interfaces'

export interface Interceptor {
  condition: (response: object) => boolean
  callback: (response: object) => void
}

const apiMiddleware = (interceptors?: Interceptor[]) => () => (next: any) => (action: Action): object => {
  if (!action.request) {
    return next(action)
  }

  const REQUEST = `${action.type}_REQUEST`
  const SUCCESS = action.type
  const FAILURE = `${action.type}_FAILURE`

  next({ ...action, type: REQUEST })

  return GQLFetch.run(action.request.query, action.request.variables)
    .catch((errors) => {
      next({ type: FAILURE, errors, requestAction: action })
      return errors
    })
    .then((resp) => {
      if (resp?.data) {
        const interceptor = interceptors?.find(({ condition }): boolean => condition(resp))
        if (interceptor) {
          next(interceptor.callback(resp))
        } else if (resp.data.errors) {
          next({ type: FAILURE, errors: resp.data.errors, requestAction: action })
          throw new GraphQLError(resp.data.errors)
        } else {
          const response = action.request?.multi ? resp.data.data : resp.data.data[Object.keys(resp.data.data)[0]]
          next({ type: SUCCESS, data: response, requestAction: action })
          return response
        }
      }
    })
}

export default apiMiddleware
