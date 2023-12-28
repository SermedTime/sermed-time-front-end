export interface IWorkTime {
  day: string
  firstEntry: string | undefined
  firstExit: string | undefined
  secondEntry: string | undefined
  secondExit: string | undefined
  thirdEntry: string | undefined
  thirdExit: string | undefined
}

export const fakeWorkTime: IWorkTime[] = [
  {
    day: 'Segunda-Feira',
    firstEntry: '07:00',
    firstExit: '12:00',
    secondEntry: '13:00',
    secondExit: '16:00',
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Terça-Feira',
    firstEntry: '07:00',
    firstExit: '12:00',
    secondEntry: '13:00',
    secondExit: '16:00',
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Quarta-Feira',
    firstEntry: '07:00',
    firstExit: '12:00',
    secondEntry: '13:00',
    secondExit: '16:00',
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Quinta-Feira',
    firstEntry: '07:00',
    firstExit: '12:00',
    secondEntry: '13:00',
    secondExit: '16:00',
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Sexta-Feira',
    firstEntry: '07:00',
    firstExit: '12:00',
    secondEntry: '13:00',
    secondExit: '16:00',
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Sabádo',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined
  },
  {
    day: 'Domingo',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined
  }
]
