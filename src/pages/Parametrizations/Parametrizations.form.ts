import {
  ROUTE_MANAGEMENT_COMPANIES_CREATE,
  ROUTE_MANAGEMENT_COMPANIES_LIST
} from '@/routes/Pages/Parametrizations/Management/Management.paths'

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
        routeToAdd: ROUTE_MANAGEMENT_COMPANIES_CREATE
      },
      {
        icon: 'person',
        title: 'Funcionários',
        routeToList: '',
        routeToAdd: ''
      },
      {
        icon: 'access_time',
        title: 'Horários',
        routeToList: '',
        routeToAdd: ''
      },
      {
        icon: 'calendar_month',
        title: 'Escalas',
        routeToList: '',
        routeToAdd: ''
      }
    ]
  }
]
