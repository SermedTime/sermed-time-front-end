export function handleWeekDayName(index: number) {
  switch (index) {
    case 1:
      return 'Domingo'

    case 2:
      return 'Segunda-feira'

    case 3:
      return 'Terça-feira'

    case 4:
      return 'Quarta-feira'

    case 5:
      return 'Quinta-Feira'

    case 6:
      return 'Sexta-feira'

    case 7:
      return 'Sabádo'

    default:
      return ''
  }
}

export const weekDays: string[] = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-Feira',
  'Sexta-feira',
  'Sabádo'
]
