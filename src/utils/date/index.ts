import { startOfMonth, endOfMonth, format, parseISO, getDay } from 'date-fns'

export function firstDayOfCurrentMonth(): Date {
  return startOfMonth(new Date())
}

export function lastDayOfCurrentMonth(): Date {
  return endOfMonth(new Date())
}

export function lastDayByDate(date: Date): number {
  const lastDayMonthDate = endOfMonth(date)

  const lastDayMonth = lastDayMonthDate.getDate()

  return Number(lastDayMonth)
}

export function convertIsoDateToPtBr(
  date: string | undefined | null,
  time = false,
  isUTC = true
): string {
  if (!date) return ''

  const dateWithoutTimezone = date.replace(/Z|([+-]\d{2}:\d{2})$/g, '')

  return format(
    parseISO(isUTC ? date : dateWithoutTimezone),
    time ? `dd/MM/yyyy 'às' HH:mm` : 'dd/MM/yyyy'
  )
}

export function convertIsoDateToTime(date: string | undefined | null): string {
  if (!date) return ''

  const dateWithoutTimezone = date.replace(/Z|([+-]\d{2}:\d{2})$/g, '')

  return format(parseISO(dateWithoutTimezone), 'HH:mm')
}

export function convertDateToString(date: Date | undefined | null): string {
  if (!date) return ''

  return format(date, 'dd/MM/yyyy')
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

export function convertDataUTCToGMTMore3(date: string) {
  const currentDate = new Date(date)

  const currentDateGmtMore3 = currentDate.setHours(currentDate.getHours() + 3)

  return new Date(currentDateGmtMore3).toISOString()
}

export function convertDateToWeekDay(date: Date) {
  let day = ''

  switch (getDay(date)) {
    case 0:
      day = 'Domingo'
      break
    case 1:
      day = 'Segunda-Feira'
      break
    case 2:
      day = 'Terça-Feira'
      break
    case 3:
      day = 'Quarta-Feira'
      break
    case 4:
      day = 'Quinta-Feira'
      break
    case 5:
      day = 'Sexta-Feira'
      break
    case 6:
      day = 'Sábado'
      break
    default:
      day = ''
  }

  return day
}

export function createLocalDate(date: string) {
  const partes = date.split('T')[0].split('-') // Separa a data '2024-12-25' de '00:00:00.000Z' e quebra em partes
  const ano = parseInt(partes[0], 10)
  const mes = parseInt(partes[1], 10) - 1 // JavaScript conta meses a partir de 0
  const dia = parseInt(partes[2], 10)

  // Cria a data como local
  const dataLocal = new Date(ano, mes, dia)

  return dataLocal
}
