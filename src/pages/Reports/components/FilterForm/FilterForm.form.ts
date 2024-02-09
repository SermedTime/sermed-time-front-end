import { DEFAULT_RECORDS_PER_PAGE } from '@/constants/default-values'

export interface IReportsFilterForm {
  records: number
  initial_date: Date | null
  final_date: Date | null
  min_absense: number | null
  max_absense: number | null
  min_extra_time: number | null
  max_extra_time: number | null
  min_annual_leave: number | null
  max_annual_leave: number | null
}

export const initialFilterValues: IReportsFilterForm = {
  records: DEFAULT_RECORDS_PER_PAGE,
  initial_date: null,
  final_date: null,
  min_absense: null,
  max_absense: null,
  min_extra_time: null,
  max_extra_time: null,
  min_annual_leave: null,
  max_annual_leave: null
}
