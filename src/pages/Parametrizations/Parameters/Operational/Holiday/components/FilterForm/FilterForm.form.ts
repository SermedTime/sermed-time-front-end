import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IHolidayFilterForm {
  records: number
  status: string
  holidayTipe: 'all' | 'national' | 'state' | 'municipal'
  initialDate: Date | null
  finalDate: Date | null
}

export const initialFilterValues: IHolidayFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  status: 'all',
  holidayTipe: 'all', // 'all', 'national', 'state', 'municipal', 'optional', 'religious', 'other
  initialDate: null,
  finalDate: null
}
