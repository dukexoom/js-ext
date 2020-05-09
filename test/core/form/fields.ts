export default [
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
    options: ['daily', 'weekly', 'monthly'],
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
            options: async (): Promise<any> => {
              return [
                { value: 1, label: 'Role 1' },
                { value: 2, label: 'Role 2' },
              ]
            },
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
]
