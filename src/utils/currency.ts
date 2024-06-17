import currency from 'currency.js'
import { isNumber } from 'lodash-es'
import { isString } from 'xe-utils'

const defaultOpts: currency.Options = {
  separator: '',
  symbol: '¥ '
}

export type CurrencyOptions = currency.Options

function normalizeValue(value: unknown) {
  if (!isString(value) && !isNumber(value)) return 0
  return Number(value) || 0
}

export function formatCurrency(v?: unknown, opts?: currency.Options) {
  const value = normalizeValue(v)
  return currency(value, Object.assign({}, defaultOpts, opts)).format()
}
