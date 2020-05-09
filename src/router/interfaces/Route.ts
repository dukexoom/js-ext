import React from 'react'

export default interface Route {
  path: string
  exact?: boolean
  pathTo?: string
  component?: React.FC<any>
  isAuthorized?: boolean
  routes?: Route[]
  requiredPermissions?: string[]
  redirect?: boolean
}
