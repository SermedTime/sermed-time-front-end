export interface ITimeSheetFilterForm {
  month: number
  year: number
}

export const initialFilterValues: ITimeSheetFilterForm = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
}
