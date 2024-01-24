import { IRoles } from '@/contexts/Auth/Auth'

export interface IRouteProps {
  path: string
  component: React.LazyExoticComponent<any>
  isPrivate?: boolean
  allowedRoles?: IRoles[]
}
