import { ReactNode } from 'react'
import { ToastContext } from './Toast'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return <ToastContext>{children}</ToastContext>
}
