import {
  ROUTE_MANAGEMENT_COMPANIES_CREATE,
  ROUTE_MANAGEMENT_COMPANIES_LIST,
  ROUTE_MANAGEMENT_TEAMS_CREATE,
  ROUTE_MANAGEMENT_TEAMS_LIST,
  ROUTE_MANAGEMENT_UNITS_CREATE,
  ROUTE_MANAGEMENT_UNITS_LIST,
  ROUTE_MANAGEMENT_USERS_LIST,
  ROUTE_MANAGEMENT_WORKING_DAY_CREATE,
  ROUTE_MANAGEMENT_WORKING_DAY_LIST
} from '@/routes/Pages/Parametrizations/Management/Management.paths'

import {
  ROUTE_OPERATIONAL_HOLIDAY_CREATE,
  ROUTE_OPERATIONAL_HOLIDAY_LIST,
  ROUTE_OPERATIONAL_TIME_CLOCK_CREATE,
  ROUTE_OPERATIONAL_TIME_CLOCK_LIST
} from '@/routes/Pages/Parametrizations/Operational/Operational.paths'

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
        icon: 'account_balance',
        title: 'Unidades',
        routeToList: ROUTE_MANAGEMENT_UNITS_LIST,
        routeToAdd: ROUTE_MANAGEMENT_UNITS_CREATE
      },
      {
        icon: 'groups_2',
        title: 'Equipes',
        routeToList: ROUTE_MANAGEMENT_TEAMS_LIST,
        routeToAdd: ROUTE_MANAGEMENT_TEAMS_CREATE
      },
      {
        icon: 'work_history',
        title: 'Jornadas',
        routeToList: ROUTE_MANAGEMENT_WORKING_DAY_LIST,
        routeToAdd: ROUTE_MANAGEMENT_WORKING_DAY_CREATE
      },
      {
        icon: 'person',
        title: 'Usuários',
        routeToList: ROUTE_MANAGEMENT_USERS_LIST
      }
    ]
  },
  {
    title: 'Operacionais',
    description: 'As operacionais são parametrizações referentes ...',
    items: [
      {
        icon: 'access_time',
        title: 'Relógios de Ponto',
        routeToList: ROUTE_OPERATIONAL_TIME_CLOCK_LIST,
        routeToAdd: ROUTE_OPERATIONAL_TIME_CLOCK_CREATE
      },
      {
        icon: 'event_icon',
        title: 'Feriados',
        routeToList: ROUTE_OPERATIONAL_HOLIDAY_LIST,
        routeToAdd: ROUTE_OPERATIONAL_HOLIDAY_CREATE
      }
    ]
  }
]
