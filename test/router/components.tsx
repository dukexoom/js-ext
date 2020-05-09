import React from 'react'

import { ComponentHOC } from '../../src/router/resources'

const NewComponent: React.FC = () => <div>New</div>
NewComponent.displayName = 'New'

export const New: ComponentHOC = (): React.FC => NewComponent

const EditComponent: React.FC = () => <div>Edit</div>
EditComponent.displayName = 'Edit'
export const Edit: ComponentHOC = (): React.FC => EditComponent

const ShowComponent: React.FC = () => <div>Show</div>
ShowComponent.displayName = 'Show'
export const Show: ComponentHOC = (): React.FC => ShowComponent

const ListComponent: React.FC = () => <div>List</div>
ListComponent.displayName = 'List'
export const List: ComponentHOC = (): React.FC => ListComponent

export const TestAction: React.FC = () => <div>TestAction</div>
TestAction.displayName = 'TestAction'
