import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IHolidayFilterForm {
  records: number
  status: string
  initialDate: Date | null
  finalDate: Date | null
}

export const initialFilterValues: IHolidayFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  status: 'all',
  initialDate: null,
  finalDate: null
}
