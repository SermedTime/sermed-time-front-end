import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { v4 } from 'uuid'
import { ICompanies } from './useCompanies'

export const useCompaniesRequest: IApiResponse<ICompanies> = {
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
