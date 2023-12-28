import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

export interface IUserProfile {
  company: string
  cnpj: string
  stateRegistration: string
  position: string
  department: string
  responsible: string
}

export const fakeUserProfile: IApiResponse<IUserProfile> = {
  data: [
    {
      company: 'Sermed Saúde LTDA.',
      cnpj: '64924095000112',
      stateRegistration: 'ISENTO',
      position: 'Secretária',
      department: 'Administração',
      responsible: 'Leila Bugorim'
    }
  ],
  page: 1,
  total: 1
}
