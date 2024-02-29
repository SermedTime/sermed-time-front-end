import {
  ROUTE_MANAGEMENT_COMPANIES_CREATE,
  ROUTE_MANAGEMENT_COMPANIES_LIST,
  ROUTE_MANAGEMENT_TEAMS_CREATE,
  ROUTE_MANAGEMENT_TEAMS_LIST,
  ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
  ROUTE_MANAGEMENT_TIME_CLOCK_LIST,
  ROUTE_MANAGEMENT_USERS_LIST
} from '@/routes/Pages/Parametrizations/Management/Management.paths'
import { IParameterList } from './Parametrizations.interface'

export const initialParameterList: IParameterList[] = [
  {
    title: 'Gerenciais',
    description: 'As gerenciais são parametrizações referentes ...',
    items: [
      {
        icon: 'business',
        title: 'Empresas',
        routeToList: ROUTE_MANAGEMENT_COMPANIES_LIST,
        routeToAdd: ROUTE_MANAGEMENT_COMPANIES_CREATE
      },
      {
        icon: 'access_time',
        title: 'Equipes',
        routeToList: ROUTE_MANAGEMENT_TEAMS_LIST,
        routeToAdd: ROUTE_MANAGEMENT_TEAMS_CREATE
      },
      {
        icon: 'person',
        title: 'Usuários',
        routeToList: ROUTE_MANAGEMENT_USERS_LIST
      },

      {
        icon: 'alarm_add',
        title: 'Relógios de Ponto',
        routeToList: ROUTE_MANAGEMENT_TIME_CLOCK_LIST,
        routeToAdd: ROUTE_MANAGEMENT_TIME_CLOCK_CREATE
      }
    ]
  }
]
