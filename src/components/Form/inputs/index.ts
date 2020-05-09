import Proxy from './Proxy'
import SmartJSON from './SmartJSON'
import Select from './Select'
import JSON from './JSON'
import Hidden from './Hidden'
import Dictionary from '../../../interfaces/Dictionary'

const inputs: Dictionary<any> = {
  text: Proxy,
  integer: Proxy,
  float: Proxy,
  checkbox: Proxy,
  datePicker: Proxy,
  json: JSON,
  smartJSON: SmartJSON,
  select: Select,
  file: Proxy,
  image: Proxy,
  password: Proxy,
  hidden: Hidden,
  range: Proxy,
}

export default inputs
