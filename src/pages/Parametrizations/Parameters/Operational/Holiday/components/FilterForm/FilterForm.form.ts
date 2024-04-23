import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IHolidayFilterForm {
  records: number
  holidayType: '' | 'N' | 'E' | 'M'
  state: string
  initialDate: Date | null
  finalDate: Date | null
}

export const initialFilterValues: IHolidayFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  holidayType: '',
  state: '',
  initialDate: null,
  finalDate: null
}
