import { isSameDay } from 'date-fns'

import { IScheduleShift } from './List.interface'

export function handleDayPropGetter(day: Date, selectedDay: Date | undefined) {
  if (!selectedDay) return {}

  return {
    className: isSameDay(day, selectedDay) ? 'selected' : ''
  }
}

export function handleEventPropGetter(
  event: IScheduleShift,
  selectedDay: Date | undefined
) {
  if (!selectedDay) {
    return {
      className: `custom-event ${event.shift}`
    }
  }

  return {
    className: `custom-event ${event.shift} ${
      isSameDay(event.schedule_date, selectedDay) ? 'selected' : ''
    }`
  }
}
