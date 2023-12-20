import { useTransition } from 'react-spring'

import { IToastMessage } from 'contexts/Toast/Toast.interface'

import { Message } from './Message'

import { Container } from './Toast.styles'

interface Props {
  messages: IToastMessage[]
}

export function Toast({ messages }: Props) {
  const transition = useTransition(messages, {
    from: { right: '-120%', opacity: '0' },
    enter: { right: '0%', opacity: '1' },
    leave: { right: '-120%', opacity: '0' },
    config: { duration: 250 }
  })

  const fragment = transition((style, item, _, key) => {
    return <Message key={key} message={item} style={style} />
  })

  return <Container hasMessages={messages.length > 0}>{fragment}</Container>
}
