import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { v4 } from 'uuid'
import { ITeams } from '../useTeams'

export const useTeamsRequest: IApiResponse<ITeams> = {
  data: [
    {
      uuid: v4(),
      name: 'Equipe 1',
      created_at: '2022-12-01',
      status: 'active'
    }
  ],
  page: 1,
  total: 1
}
