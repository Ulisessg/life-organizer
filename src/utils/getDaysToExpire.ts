// This function return from today in how many days will expire something Returns int
export function getDaysToExpire(dateToCompare: string): number {
  const today = new Date().getTime()
  const diffInMilliseconds = today - new Date(dateToCompare).getTime()
  const diffInSeconds = diffInMilliseconds / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60
  const diffInDays = diffInHours / 24
  return Math.ceil(-(diffInDays))
}