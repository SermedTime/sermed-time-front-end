import { ROUTE_MANAGEMENT_COMPANIES_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { IParameterList } from './Parametrizations.interface'

export const initialParameterList: IParameterList[] = [
  {
    title: 'Gerenciais',
    description: 'As gerenciais são parametrizações referentes ...',
    items: [
      {
        icon: 'business',
        title: 'Empresa',
        routeToList: ROUTE_MANAGEMENT_COMPANIES_LIST,
        routeToAdd: ''
      }
    ]
  }
]
