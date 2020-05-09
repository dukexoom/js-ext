import React from 'react'
import { Switch, Route as RouteComponent, Redirect } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import Route from '../../interfaces/Route'

interface Props {
  routes: Route[]
  isPermittedRoute: (route: Route) => boolean
  routeProps: object
  tokenKey?: string
}

const SwitchRoutes: React.FC<Props> = ({ routes, routeProps, isPermittedRoute, tokenKey }) => {
  const filteredRoutes = routes.filter(isPermittedRoute)
  return (
    <Switch>
      {filteredRoutes.map((route, index) => {
        if (typeof route.isAuthorized !== 'undefined' && route.component)
          return (
            <PrivateRoute
              component={route.component}
              isAuthorized={route.isAuthorized}
              key={index}
              path={route.path}
              pathTo={route.pathTo}
              tokenKey={tokenKey}
            />
          )
        if (route.redirect && route.pathTo) return <Redirect from={route.path} key={index} to={route.pathTo} />
        // if (route.collapse)
        //   return route.views.map((prop, i) => {
        //     return <Route component={prop.component} exact={prop.exact} key={i} path={prop.path} strict />
        //   })
        if (routeProps && route.component) {
          const Component = route.component
          return (
            <RouteComponent
              exact={route.exact}
              key={index}
              path={route.path}
              render={(props): React.ReactNode => <Component {...props} {...routeProps} />}
              strict
            />
          )
        }
        return <RouteComponent component={route.component} exact={route.exact} key={index} path={route.path} strict />
      })}
    </Switch>
  )
}

export default SwitchRoutes
