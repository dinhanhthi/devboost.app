import { useEffect, useState } from 'react'

type DateStatus = 'new' | 'updated' | null

/**
 * To see if a tool is "new" or "updated" within the last month
 */
export const useDateStatus = (releaseDate: Date, updatedDate?: Date) => {
  const [status, setStatus] = useState<DateStatus>(null)

  useEffect(() => {
    const now = new Date()
    const releaseDatePlusOneMonth = new Date(releaseDate)
    releaseDatePlusOneMonth.setMonth(releaseDatePlusOneMonth.getMonth() + 1)
    if (releaseDatePlusOneMonth > now) {
      setStatus('new')
    } else if (updatedDate && updatedDate > releaseDatePlusOneMonth) {
      setStatus('updated')
    }
  }, [releaseDate, updatedDate])

  return status
}

type DateRangeStatus = 'today' | 'yesterday' | 'this week' | 'this month' | null

/**
 * To see if a tool is modified within "today" or "yesterday" or "this week" or "this month"
 */
export const useDateRangeStatus = (modifiedDate: Date) => {
  const [status, setStatus] = useState<DateRangeStatus>(null)

  useEffect(() => {
    const now = new Date()
    now.setDate(now.getDate() - 1)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 2)
    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)
    const thisMonth = new Date()
    thisMonth.setDate(thisMonth.getDate() - 30)
    if (modifiedDate > now) {
      setStatus('today')
    } else if (modifiedDate > yesterday) {
      setStatus('yesterday')
    } else if (modifiedDate > thisWeek) {
      setStatus('this week')
    } else if (modifiedDate > thisMonth) {
      setStatus('this month')
    }
  }, [modifiedDate])

  return status
}
