import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IUserFilterForm {
  records: number
  status: string
  companyId: string
  unitId: string
  teamId: string
}

export const initialFilterValues: IUserFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  status: 'all',
  companyId: '',
  unitId: '',
  teamId: ''
}
