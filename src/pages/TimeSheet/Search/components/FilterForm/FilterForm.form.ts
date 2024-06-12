export interface IUserFilterForm {
  records: number
  status: string
}

export const initialFilterValues: IUserFilterForm = {
  records: 6,
  status: 'all'
}
