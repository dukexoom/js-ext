import Field from './Field'

export default interface Settings {
  fields: Field[]
  layout: 'vertical' | 'horizontal' | undefined
  doubleActionsButtons: boolean
}
