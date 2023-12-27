import { ReactNode } from 'react'
import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { HeaderContext } from './Layout/Header'
import { BreadcrumbContext } from './Layout/Breadcrumb'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <AuthContext>
        <HeaderContext>
          <BreadcrumbContext>
            <ToastContext>{children}</ToastContext>
          </BreadcrumbContext>
        </HeaderContext>
      </AuthContext>
    </LoaderContext>
  )
}
