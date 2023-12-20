export function formatCurrency(
  value: number | string | undefined | null
): string {
  if (!value) return 'R$ 0,00'

  if (typeof value === 'string') {
    const newValue = Number(value.replace('.', '').replace(',', '.'))

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(newValue))
  }

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value))
}

function nFormatter(value: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return value >= item.value
    })

  return item
    ? (value / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}

export function abrreviateCurrency(value: number | undefined | null): string {
  if (!value) return ''

  return `R$ ${nFormatter(value, 1)}`
}

export function convertCurrencyToNumber(value: string): number | string {
  if (!value) return ''

  return Number(
    value
      .replace(/[^0-9.,]+/, '')
      .replace('.', '')
      .replace(',', '.')
  )
}
