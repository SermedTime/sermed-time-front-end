import { v4 } from 'uuid'

export interface ITimeSheet {
  id: number | string
  date: string
  firstEntry: string | undefined
  firstExit: string | undefined
  secondEntry: string | undefined
  secondExit: string | undefined
  thirdEntry: string | undefined
  thirdExit: string | undefined
  overtime: string | undefined
}

export const fakeTimeSheet: ITimeSheet[] = [
  {
    id: v4(),
    date: '01/11/2023 - qua',
    firstEntry: '07:08',
    firstExit: '12:09',
    secondEntry: '13:17',
    secondExit: '16:12',
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '02/11/2023 - qui',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '03/11/2023 - sex',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '04/11/2023 - sab',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '05/11/2023 - dom',
    firstEntry: undefined,
    firstExit: undefined,
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '06/11/2023 - seg',
    firstEntry: '07:28',
    firstExit: '12:12',
    secondEntry: '13:18',
    secondExit: '16:40',
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '07/11/2023 - ter',
    firstEntry: '07:18',
    firstExit: '12:13',
    secondEntry: '13:27',
    secondExit: '16:21',
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  },
  {
    id: v4(),
    date: '08/11/2023 - qua',
    firstEntry: '07:27',
    firstExit: '12:19',
    secondEntry: '13:20',
    secondExit: '17:16',
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: '00:48'
  },
  {
    id: v4(),
    date: '09/11/2023 - qui',
    firstEntry: '07:17',
    firstExit: '15:04',
    secondEntry: undefined,
    secondExit: undefined,
    thirdEntry: undefined,
    thirdExit: undefined,
    overtime: undefined
  }
]
