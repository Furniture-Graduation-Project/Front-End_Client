export const formatCurrency = (value: number, language: 'vi' | string, currency: string = 'VND'): string => {
  let currentLocale
  if (language === 'vi') {
    currentLocale = 'vi-VN'
  } else {
    currentLocale = 'en-US'
    currency = 'USD'
  }
  const formattedValue = currentLocale === 'en-US' && currency !== 'VND' ? value / 25 : value
  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency
  }).format(formattedValue)
}
