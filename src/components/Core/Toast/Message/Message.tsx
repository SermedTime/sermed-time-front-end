import { useEffect } from 'react'

import { SpringValue } from 'react-spring'

import { IToastType, IToastMessage } from 'contexts/Toast/Toast.interface'

import { useToastContext } from '@/contexts/Toast'
import { Container } from './Message.styles'
import { Heading } from '../../Typography/Heading'
import { Paragraph } from '../../Typography/Paragraph'
import { ButtonIcon } from '../../Buttons/ButtonIcon'

interface Props {
  message: IToastMessage
  style?: {
    opacity: SpringValue<string>
  }
}

export function Message({ message, style }: Props) {
  const { removeToast } = useToastContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [message, removeToast])

  function handleIcon(icon: IToastType) {
    switch (icon) {
      case 'success':
        return 'done'

      case 'helper':
        return 'warning'

      case 'warning':
        return 'error'

      default:
        return ''
    }
  }

  return (
    <Container type={message.type} style={style}>
      <div className="icon">
        <span className="material-icons">{handleIcon(message.type)}</span>
      </div>

      <div className="text">
        <div className="heading">
          <Heading size="sm" className="text-neutral-high-pure">
            {message.title}
          </Heading>
        </div>

        {message.description && (
          <Paragraph size="sm" className="text-neutral-high-medium">
            {message.description}
          </Paragraph>
        )}
      </div>

      <div className="close">
        <ButtonIcon
          size="sm"
          icon="close"
          onClick={() => {
            removeToast(message.id)
          }}
        />
      </div>
    </Container>
  )
}

Message.defaultProps = {
  style: undefined
}
