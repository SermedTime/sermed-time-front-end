import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

interface INavigation {
  icon: string
  label: string
  route?: string
  allowedRoles?: string[]
  list?: {
    label: string
    route: string
  }[]
}

export const nav: INavigation[] = [
  {
    icon: 'home',
    label: 'Home',
    route: ROUTE_HOME
  }
]
