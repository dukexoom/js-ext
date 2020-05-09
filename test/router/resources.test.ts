import resources from '../../src/router/resources'
import { New, Edit, Show, List, TestAction } from './components'
import _ from 'lodash'

test('correct routers', (): void => {
  const views = {
    custom: { cdnServers: { TestAction } },
    crud: {
      components: { New, Edit, Show, List },
      settings: { cdnServers: { list: {}, gql: { create: 'some query', update: 'some query', show: 'some query' } } },
    },
  }
  const expectedResult = [
    {
      requiredPermissions: ['cdn_servers', 'edit'],
      path: '/cdn_servers/new',
    },
    {
      requiredPermissions: ['cdn_servers', 'edit'],
      path: '/cdn_servers/:id/edit',
    },
    {
      requiredPermissions: ['cdn_servers', 'view'],
      path: '/cdn_servers/:id/show',
    },
    {
      requiredPermissions: ['cdn_servers', 'view'],
      path: '/cdn_servers',
      exact: true,
    },
    { path: '/cdn_servers/test_action', requiredPermissions: undefined },
  ]
  const result = resources(views, 'cdnServers', [{ routeAction: 'test_action' }])
  const [neew, edit, show, list, testAction] = result

  expect(neew.component?.displayName).toEqual('New') // eslint-disable-line
  expect(edit.component?.displayName).toEqual('Edit') // eslint-disable-line
  expect(show.component?.displayName).toEqual('Show') // eslint-disable-line
  expect(list.component?.displayName).toEqual('List') // eslint-disable-line
  expect(testAction.component?.displayName).toEqual('TestAction') // eslint-disable-line
  expect(result.map((r) => _.omit(r, 'component'))).toEqual(expectedResult)
})
