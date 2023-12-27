import { ReactNode } from 'react'

import { useAuthContext } from '@/contexts/Auth'
import { useZoomDetection } from '@/hooks/utils/useZoomDetection'
import * as S from './Layout.styles'
import { Header } from './Header'
import { SideMenu } from './SideMenu'
import { Footer } from './Footer'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  const { user } = useAuthContext()
  const { zoomLevel } = useZoomDetection()

  function handleOnZoomDetectionClass() {
    if (zoomLevel === 1) return '100%'

    return '110%'
  }

  return (
    <>
      {user ? (
        <S.Container width={handleOnZoomDetectionClass()}>
          <Header />

          <SideMenu />

          {children}

          <Footer />
        </S.Container>
      ) : (
        <S.Container width={handleOnZoomDetectionClass()}>
          {children}
        </S.Container>
      )}

      <S.Background>
        <S.Ellipse />
      </S.Background>
    </>
  )
}
