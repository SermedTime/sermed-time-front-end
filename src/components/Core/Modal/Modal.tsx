import { ReactNode } from 'react'

import ReactDOM from 'react-dom'

import { useModalContext } from '@/contexts/Layout/Modal'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { Backdrop, Dialog, Content, CloseButton } from './Modal.styles'

interface Props {
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  mw?: 'sm' | 'md' | 'lg' | 'xl'
  visible: boolean
  children: ReactNode
  onClose?: () => void
}

const domNode = document.createElement('div')
domNode.setAttribute('id', 'modal')
document.body.appendChild(domNode)

function BodyPortal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(children, domNode)
}

export function Modal({ blur, mw, visible, children, onClose }: Props) {
  const { amount } = useModalContext()

  if (!visible) return null

  return (
    <BodyPortal>
      <Backdrop>
        <Dialog
          className="custom-modal"
          style={{ zIndex: 1090 + amount }}
          mw={mw}
        >
          <Content blur={blur}>
            <CloseButton>
              <ButtonIcon size="md" icon="close" onClick={onClose} />
            </CloseButton>

            {children}
          </Content>
        </Dialog>
      </Backdrop>
    </BodyPortal>
  )
}

Modal.defaultProps = {
  blur: undefined,
  mw: undefined,
  onClose: undefined
}
