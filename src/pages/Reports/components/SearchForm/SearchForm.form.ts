export interface IReportsSearchForm {
  team_id: string
  user_id: string
  groupByTeam: boolean
}

export const initialSearchValues: IReportsSearchForm = {
  team_id: '',
  user_id: '',
  groupByTeam: false
}
