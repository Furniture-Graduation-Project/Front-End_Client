export const formatCurrency = (value: number, locale: string = 'vi-VN', currency: string = 'VND'): string => {
  const formattedValue = locale === 'en-US' ? value / 25 : value
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(formattedValue)
}