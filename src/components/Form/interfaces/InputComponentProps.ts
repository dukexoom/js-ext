import { Event, Field, Config } from './index'
import Dictionary from '../../../interfaces/Dictionary'

export default interface InputComponentProps {
  config: Config
  value: any
  layout: 'horizontal' | 'vertical'
  sm?: number
  name?: string | string[]
  onChange: (event: Event) => void
  field: Field
  success: boolean
  errors: Dictionary<any>
  actionType: 'edit' | 'new'
}
