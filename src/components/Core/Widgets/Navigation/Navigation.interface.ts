import { IconAppearence } from 'components/Core/Icons/Icon/Icon.interface'

export interface INavigation {
  appearance?: IconAppearence
  icon: string
  label: string
  route: string
}
