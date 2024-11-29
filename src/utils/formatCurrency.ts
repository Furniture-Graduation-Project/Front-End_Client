export const formatCurrency = (value: number, language: 'vi' | string, currency: string = 'VND'): string => {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency
  }).format(value)
}
