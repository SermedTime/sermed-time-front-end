import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { v4 } from 'uuid'
import { IUsers } from '../useUsers'

export const useUsersRequest: IApiResponse<IUsers> = {
  data: [
    {
      uuid: v4(),
      name: 'Ana Flávia de Souza',
      created_at: '2022-12-01',
      status: 'active'
    },
    {
      uuid: v4(),
      name: 'Ana Carolina de Jesus',
      created_at: '2022-12-01',
      status: 'active'
    },
    {
      uuid: v4(),
      name: 'Ana Carolina de Jesus',
      created_at: '2022-12-01',
      status: 'active'
    },
    {
      uuid: v4(),
      name: 'Ana Carolina de Jesus',
      created_at: '2022-12-01',
      status: 'active'
    },
    {
      uuid: v4(),
      name: 'Ana Carolina de Jesus',
      created_at: '2022-12-01',
      status: 'active'
    }
  ],
  page: 1,
  total: 8
}
