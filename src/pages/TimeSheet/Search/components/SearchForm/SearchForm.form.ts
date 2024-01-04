export interface IUserSearchForm {
  search: string
  searchingBy: string
}

export const initialSearchValues: IUserSearchForm = {
  search: '',
  searchingBy: 'name'
}
