import {
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
        icon: 'person',
        title: 'Usuários',
        routeToList: ROUTE_MANAGEMENT_USERS_LIST,
        routeToAdd: ''
      },
      {
        icon: 'access_time',
        title: 'Equipes',
        routeToList: ROUTE_MANAGEMENT_TEAMS_LIST,
        routeToAdd: ROUTE_MANAGEMENT_TEAMS_CREATE
      },
      {
        icon: 'admin_panel_settings',
        title: 'Supervisores',
        routeToList: '',
        routeToAdd: ''
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
