import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { v4 } from 'uuid'
import { ITimeClock } from '../useTimeClock'

export const useTimeClockRequest: IApiResponse<ITimeClock> = {
  data: [
    {
      uuid: v4(),
      name: 'Relógio de Ponto 1',
      created_at: '2022-12-01',
      status: 'active'
    }
  ],
  page: 1,
  total: 1
}
