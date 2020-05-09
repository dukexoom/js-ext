import React from 'react'
import Dictionary from '../../../interfaces/Dictionary'

export default interface Config {
  hasPermission?: (resource: string) => boolean
  Form: React.FC<any>
  InputList: React.FC<any>
  InputRow: React.FC<any>
  inputs: Dictionary<React.FC<any>>
}
