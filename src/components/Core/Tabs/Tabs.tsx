import { ReactNode, useState } from 'react'

import { Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap'

import { Container } from './Tabs.styles'

interface TabsProps {
  defaultActiveKey: string
  children: ReactNode
  onChange?: (activeKey: string) => void
}

export function Tabs({ defaultActiveKey, children, onChange }: TabsProps) {
  const [key, setKey] = useState(defaultActiveKey)

  function handleOnSelect(eventKey: any) {
    setKey(eventKey)

    onChange && onChange(eventKey)
  }

  return (
    <Container>
      <BootstrapTabs
        defaultActiveKey={key}
        onSelect={callback => handleOnSelect(callback)}
      >
        {children}
      </BootstrapTabs>
    </Container>
  )
}

Tabs.defaultProps = {
  onChange: undefined
}

interface TabProps {
  eventKey: string
  title: string
  children: ReactNode
}

export function Tab({ eventKey, title, children }: TabProps) {
  return (
    <BootstrapTab eventKey={eventKey} title={title}>
      {children}
    </BootstrapTab>
  )
}
