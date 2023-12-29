import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IParametersFilterForm {
  records: number
  status: string
}

export const initialFilterValues: IParametersFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  status: 'all'
}
