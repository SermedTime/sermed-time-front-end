import { useState } from 'react'

import { Container } from './SwitchButton.styles'

interface Button {
  key: string
  text: string
}

interface Props {
  defaultActiveKey: string
  firstButton: Button
  secondButton: Button
  onChange: (key: string) => void
}

export function SwitchButton({
  defaultActiveKey,
  firstButton,
  secondButton,
  onChange
}: Props) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  function handleOnClick(key: string) {
    onChange(key)
    setActiveKey(key)
  }

  return (
    <Container>
      <button
        type="button"
        className={activeKey === firstButton.key ? 'active' : ''}
        onClick={() => handleOnClick(firstButton.key)}
      >
        {firstButton.text}
      </button>

      <button
        type="button"
        className={activeKey === secondButton.key ? 'active' : ''}
        onClick={() => handleOnClick(secondButton.key)}
      >
        {secondButton.text}
      </button>
    </Container>
  )
}
