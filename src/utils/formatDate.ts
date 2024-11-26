export const formatDate = (date: number | Date | undefined, language = 'vi-VN') => {
  return new Intl.DateTimeFormat(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
