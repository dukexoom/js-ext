import _ from 'lodash'
import { Target } from './interfaces/Event'
import Dictionary from '../../interfaces/Dictionary'

export const baseHandler = ({ value }: Target): any => value

export const integerHandler = ({ value }: Target): string | number =>
  /(^-$)|(-\D+)/.test(value) ? '-' : parseInt(value)

export const floatHandler = (target: Target): string | number => {
  let { value } = target
  // If the value is "-" or the last character of the value is "0", then do nothing, because parsing will remove these characters
  if (/(^-$)|(0$)/.test(value)) {
    // If the last character of the value is ".", then check if there are any more ".". If they are, then cut the last ".". If there are no more points, then we do not change the value.
  } else if (/\d+\.$/.test(value)) {
    value = /\./.test(value.slice(0, value.length - 1)) ? value.slice(0, value.length - 1) : value

    // If after the first "-" or after "0" not a number is entered, then we cut the last character (without parsing)
  } else if (/(-\D$)|(0\D$)/.test(value)) {
    value = value.slice(0, value.length - 1)
  } else {
    value = parseFloat(value)
  }

  return value
}

export const checkboxHandler = ({ checked }: Target): boolean | undefined => checked

export const fileHandler = ({ files }: Target): Dictionary<any> | undefined => _.first(files)

export const rangeHandler = ({ value, name }: Target): string[] | number[] =>
  value.map((v: string) => integerHandler({ value: v, name }))

const handlers: Dictionary<any> = {
  checkbox: checkboxHandler,
  text: baseHandler,
  select: baseHandler,
  datePicker: baseHandler,
  integer: integerHandler,
  float: floatHandler,
  json: baseHandler,
  file: fileHandler,
  image: fileHandler,
  password: baseHandler,
  hidden: baseHandler,
  range: rangeHandler,
}

export default handlers
