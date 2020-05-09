import Dictionary from '../../../interfaces/Dictionary'

export default interface Event {
  target: Target
}

export interface Target {
  name: string
  value: any
  checked?: boolean
  files?: Dictionary<any>[]
}
