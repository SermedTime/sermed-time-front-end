import { ReactNode, useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'

import { v4 } from 'uuid'

import { IDropdown } from './Dropdown.interface'

import {
  Wrapper,
  Container,
  List,
  Item,
  ItemWrapper,
  Label
} from './Dropdown.styles'
import { Icon } from '../Icons/Icon'

interface Props {
  children: ReactNode
  display?: 'block'
  type: 'hover' | 'click'
  list: IDropdown[]
  onOpen?: (open: boolean) => void
}

export function Dropdown({ children, display, type, list, onOpen }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    onOpen && onOpen(open)
  }, [onOpen, open])

  function handleOnClick() {
    type === 'click' && setOpen(open => !open)
  }

  function handleOnMouseEnter() {
    type === 'hover' && setOpen(true)
  }

  function handleOnMouseLeave() {
    type === 'hover' && setOpen(false)
  }

  return (
    <Wrapper
      ref={wrapperRef}
      open={open}
      onClick={() => handleOnClick()}
      onMouseEnter={() => handleOnMouseEnter()}
      onMouseLeave={() => handleOnMouseLeave()}
    >
      {children}

      <Container>
        <List display={display}>
          {list
            .filter(el => !el.hide)
            .map(item => (
              <Item
                key={v4()}
                danger={item.danger}
                onClick={item.onClick}
                className={item.route ? 'route' : 'no-route'}
              >
                {item.route ? (
                  <Link to={item.route}>
                    {item.icon && <Icon icon={item.icon} />}

                    <Label>{item.text}</Label>
                  </Link>
                ) : (
                  <ItemWrapper>
                    {item.icon && <Icon icon={item.icon} />}

                    <Label>{item.text}</Label>
                  </ItemWrapper>
                )}
              </Item>
            ))}
        </List>
      </Container>
    </Wrapper>
  )
}

Dropdown.defaultProps = {
  display: undefined,
  onOpen: undefined
}
