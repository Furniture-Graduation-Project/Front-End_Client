export const formatDate = (date: number | Date | undefined | unknown, language = 'vi-VN') => {
  const parsedDate =
    date instanceof Date ? date : typeof date === 'string' || typeof date === 'number' ? new Date(date) : null
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return
  }
  return new Intl.DateTimeFormat(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(parsedDate)
}
