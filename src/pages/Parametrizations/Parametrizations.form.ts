import {
  ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
  ROUTE_MANAGEMENT_TIME_CLOCK_LIST
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
        routeToList: '',
        routeToAdd: ''
      },
      {
        icon: 'access_time',
        title: 'Equipes',
        routeToList: '',
        routeToAdd: ''
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
