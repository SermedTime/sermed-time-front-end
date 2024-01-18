import { startOfMonth, endOfMonth, format, parseISO } from 'date-fns'

export function firstDayOfCurrentMonth(): Date {
  return startOfMonth(new Date())
}

export function lastDayOfCurrentMonth(): Date {
  return endOfMonth(new Date())
}

export function convertIsoDateToPtBr(
  date: string | undefined | null,
  time = false
): string {
  if (!date) return ''

  const dateWithoutTimezone = date.replace(/Z|([+-]\d{2}:\d{2})$/g, '')

  return format(
    parseISO(dateWithoutTimezone),
    time ? `dd/MM/yyyy 'às' HH:mm` : 'dd/MM/yyyy'
  )
}

export function convertIsoDateToTime(date: string | undefined | null): string {
  if (!date) return ''

  return format(parseISO(date), 'HH:mm')
}

export function convertDateToString(date: Date | undefined | null): string {
  if (!date) return ''

  return format(date, 'yyyy-MM-dd')
}

export function convertIntToTime(time: number | undefined): string {
  let formattedTime = '00:00'

  if (time) {
    const hoursAmount = Math.floor(time)
    const minutesAmount = ((time - hoursAmount) * 60).toFixed(0)

    const minutes =
      Number(minutesAmount) < 10 ? `0${minutesAmount}` : minutesAmount

    const hours = hoursAmount < 10 ? `0${hoursAmount}` : hoursAmount

    formattedTime = `${hours}:${minutes}`
  }

  return formattedTime
}

export function validateData(
  values: any,
  date: Date | string,
  field: string
): boolean {
  if (field === 'initialDate') {
    if (date && values.finalDate) {
      if (date > values.finalDate) {
        return true
      }
      return false
    }
  }

  if (field === 'finalDate') {
    if (values.initialDate && date) {
      if (values.initialDate > date) {
        return true
      }
      return false
    }
  }

  return false
}
