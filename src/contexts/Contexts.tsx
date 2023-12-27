import { ReactNode } from 'react'

import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { HeaderContext } from './Layout/Header'
import { BreadcrumbContext } from './Layout/Breadcrumb'
import { FooterContext } from './Layout/Footer'
import { ModalContext } from './Layout/Modal'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <AuthContext>
        <ModalContext>
          <HeaderContext>
            <BreadcrumbContext>
              <FooterContext>
                <ToastContext>{children}</ToastContext>
              </FooterContext>
            </BreadcrumbContext>
          </HeaderContext>
        </ModalContext>
      </AuthContext>
    </LoaderContext>
  )
}
