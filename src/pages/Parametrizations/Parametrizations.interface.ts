interface IParameter {
  icon: string
  title: string
  routeToList: string
  routeToAdd?: string
}

export interface IParameterList {
  title: string
  description: string
  items: IParameter[]
}
