export interface IApiResponse<T> {
  data: T[]
  page: number
  total: number
}

export const defaultValues = {
  data: [],
  page: 0,
  total: 0
}
