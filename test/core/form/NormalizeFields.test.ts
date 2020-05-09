import NormalizeFields from '../../../src/core/form/NormalizeFields'
import fields from './fields'

test('run', async (): Promise<any> => {
  expect.assertions(1)

  const data = await NormalizeFields.run(fields)
  expect(data).toEqual([
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'challengeType',
      label: 'Challenge',
      type: 'select',
      allowEmpty: true,
      options: [
        { value: 'daily', label: 'daily' },
        { value: 'weekly', label: 'weekly' },
        { value: 'monthly', label: 'monthly' },
      ],
    },
    {
      name: 'rewards',
      label: 'Rewards',
      type: 'json[]',
    },
    {
      name: 'data',
      label: 'Data',
      type: 'smartJSON',
      view: 'tabs',
      fields: [
        {
          name: 'static',
          tab: 'Static',
          type: 'json',
          defaultValue: {},
        },
        {
          name: 'dynamic',
          tab: 'Dynamic',
          type: 'smartJSON[]',
          fields: [
            {
              name: 'roles',
              label: 'Roles',
              type: 'select',
              multiple: true,
              options: [
                { value: 1, label: 'Role 1' },
                { value: 2, label: 'Role 2' },
              ],
              requiredPermissions: ['roles'],
            },
            {
              name: 'conditions',
              label: 'Conditions',
              type: 'smartJSON[]',
              fields: [
                {
                  name: 'type',
                  label: 'Type',
                  type: 'select',
                  options: [
                    { value: 'last_play', label: 'Last Play' },
                    { value: 'leaderboard', label: 'Leaderboard' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ])
})
