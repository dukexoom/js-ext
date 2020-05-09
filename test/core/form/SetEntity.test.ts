import SetEntity from '../../../src/core/form/SetEntity'
import fields from './fields'
import uuid from 'uuid/v4'
import { mocked } from 'ts-jest/utils'
import Dictionary from '../../../src/interfaces/Dictionary'

jest.mock('uuid/v4')

describe('run', (): void => {
  test('with entity', (): void => {
    mocked(uuid).mockImplementation((): string => 'test-uuid')

    const entity = {
      name: 'Test',
      challengeType: 'weekly',
      rewards: [{ spin: 1 }, { ticket: 2 }],
      data: {
        static: { test: 1 },
        dynamic: [{ roles: [2], conditions: [{ type: 'last_play', redundantKey: 'redundantValue' }] }],
      },
      redundantKey: 'redundantValue',
    }
    expect(SetEntity.run(fields, 'edit', entity)).toMatchObject({
      name: 'Test',
      challengeType: 'weekly',
      rewards: [
        { __uuid: 'test-uuid', spin: 1 },
        { __uuid: 'test-uuid', ticket: 2 },
      ],
      data: {
        static: { test: 1 },
        dynamic: [{ __uuid: 'test-uuid', roles: [2], conditions: [{ __uuid: 'test-uuid', type: 'last_play' }] }],
      },
    })
  })

  test('without entity', (): void => {
    expect(SetEntity.run(fields, 'new')).toMatchObject({
      rewards: [],
      data: {
        static: {},
        dynamic: [],
      },
    })
  })
})

describe('getDefaultValue', (): void => {
  test('type select', (): void => {
    expect(
      SetEntity.run(
        [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'milestone', label: 'Milestone' },
              { value: '', label: 'Empty' },
            ],
          },
        ],
        'new'
      )
    ).toMatchObject({ type: 'milestone' })
  })

  test('type: `select`, multiple: true', (): void => {
    expect(
      SetEntity.run(
        [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'milestone', label: 'Milestone' },
              { value: '', label: 'Empty' },
            ],
            multiple: true,
          },
        ],
        'new'
      )
    ).toMatchObject({ type: [] })
  })

  test('type: `select`, allowEmpty: true', (): void => {
    expect(
      SetEntity.run(
        [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'milestone', label: 'Milestone' },
              { value: '', label: 'Empty' },
            ],
            allowEmpty: true,
          },
        ],
        'new'
      )
    ).toMatchObject({})
  })
  test('type: `select`, with availableIf is true', (): void => {
    expect(
      SetEntity.run(
        [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'milestone', label: 'Milestone' },
              { value: '', label: 'Empty' },
            ],
          },
          {
            name: 'value',
            availableIf: ({ type }: Dictionary<any>): boolean => type === 'milestone',
            label: 'Value',
            type: 'text',
            defaultValue: '',
          },
        ],
        'new'
      )
    ).toMatchObject({ type: 'milestone', value: '' })
  })
  test('type: `select`, with availableIf is false', (): void => {
    expect(
      SetEntity.run(
        [
          {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'milestone', label: 'Milestone' },
              { value: '', label: 'Empty' },
            ],
          },
          {
            name: 'value',
            availableIf: (value: any, actionType: string): boolean => actionType === 'new',
            label: 'Value',
            type: 'text',
            defaultValue: '',
          },
        ],
        'edit'
      )
    ).toMatchObject({ type: 'milestone' })
  })
})
