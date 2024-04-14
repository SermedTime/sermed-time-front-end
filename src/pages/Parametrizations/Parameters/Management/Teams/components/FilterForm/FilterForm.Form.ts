import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface ITeamsFilterForm {
  records: number
  status: string
  unit: string
}

export const initialFilterValues: ITeamsFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  status: 'all',
  unit: ''
}
