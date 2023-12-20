import { ReactNode, useEffect, useState } from 'react'

import { Paragraph } from 'components/Core/Typography/Paragraph'
import { Icon } from 'components/Core/Icons/Icon'
import { SmoothReveal } from 'components/Core/Animations/SmoothReveal'

import { Wrapper, Label } from './Group.styles'

interface Props {
  size?: 'sm' | 'lg'
  label: string
  defaultOpen?: boolean
  children: ReactNode
}

export function FormGroup({ size, label, defaultOpen, children }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    defaultOpen && setOpen(true)
  }, [defaultOpen])

  return (
    <Wrapper size={size}>
      <Label onClick={() => setOpen(open => !open)}>
        <Paragraph size="sm">{label}</Paragraph>

        <Icon icon={open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
      </Label>

      <SmoothReveal visible={open}>{children}</SmoothReveal>
    </Wrapper>
  )
}

FormGroup.defaultProps = {
  size: undefined,
  defaultOpen: undefined
}
