import _ from 'lodash'
import Dictionary from '../interfaces/Dictionary'
import * as React from 'react'
import Route from './interfaces/Route'

export interface RouteRequest {
  routeAction: string
}

export interface ComponentHOC {
  (settings: Dictionary<any>): React.FC
}

export interface CRUD {
  settings: Dictionary<any>
  components: Dictionary<ComponentHOC>
}

export interface Views {
  custom: Dictionary<any>
  crud: CRUD
}
const DEFAULT_ACTIONS = [
  { gql: 'create', component: 'New', linkPostfix: 'new' },
  { gql: 'update', component: 'Edit', linkPostfix: ':id/edit' },
  { gql: 'show', component: 'Show', linkPostfix: ':id/show' },
]

const resources = (views: Views, name: string, routes: RouteRequest[]): Route[] => {
  const {
    custom,
    crud: { settings, components },
  } = views
  const result: Route[] = []

  DEFAULT_ACTIONS.forEach((el) => {
    if (_.get(settings, [name, 'gql', el.gql])) {
      result.push({
        requiredPermissions: [_.snakeCase(name), el.gql === 'show' ? 'view' : 'edit'],
        path: `/${_.snakeCase(name)}/${el.linkPostfix}`,
        component: _.get(custom, [name, el.component]) || components[el.component](settings[name]),
      })
    }
  })

  if (_.get(settings, [name, 'list'])) {
    const List = (_.get(custom, [name, 'List']) || components.List)(settings[name])
    result.push({
      requiredPermissions: [_.snakeCase(name), 'view'],
      path: `/${_.snakeCase(name)}`,
      component: List,
      exact: true,
    })
  }

  // Custom actions
  if (routes) {
    routes.forEach((route) => {
      const buttonSettings = (settings[name].headerButtons || []).find((b: any) => b.routeAction === route.routeAction)

      result.push({
        path: `/${_.snakeCase(name)}/${_.snakeCase(route.routeAction)}`,
        component: _.get(custom, [name, _.upperFirst(_.camelCase(route.routeAction))]),
        requiredPermissions: buttonSettings?.requiredPermissions, // eslint-disable-line
      })
    })
  }
  return result
}

export default resources
