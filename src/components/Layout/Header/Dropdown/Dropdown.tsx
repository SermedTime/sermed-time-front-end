import { useEffect, useState } from 'react'

import AvatarImage from '@/assets/images/user-avatar-sm.png'

import { useAuthContext } from '@/contexts/Auth'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

import { IDropdown } from '@/components/Core/Dropdown/Dropdown.interface'
import { Dropdown } from '@/components/Core/Dropdown'

import { Icon } from '@/components/Core/Icons/Icon'
import * as S from './Dropdown.styles'

export function DropdownMenu() {
  const { user, signOut } = useAuthContext()

  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState<IDropdown[]>([])

  useEffect(() => {
    if (!user) return

    const newList = []

    newList.push({
      icon: 'person',
      text: 'Perfil',
      route: ROUTE_HOME // NAVIGATE TO PROFILE
    })

    newList.push({
      icon: 'settings',
      text: 'Configurações',
      route: ROUTE_HOME // NAVIGATE TO SETTINGS
    })

    newList.push({
      icon: 'exit_to_app',
      text: 'Sair',
      onClick: () => signOut(),
      danger: true
    })

    setList(newList)
  }, [user, signOut])

  return (
    <Dropdown display="block" type="hover" list={list} onOpen={setIsOpen}>
      <S.Button type="button">
        <S.User>
          <S.Avatar>
            <img src={AvatarImage} alt="Username" />
          </S.Avatar>

          <S.Username>{user?.firstName}</S.Username>
        </S.User>

        <Icon icon={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
      </S.Button>
    </Dropdown>
  )
}
