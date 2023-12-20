import { ReactNode, useState } from 'react'

import { Order } from './Order'
import { IOrder } from './Order/Order.interface'

import { Wrapper, Scrollable, Container } from './Table.styles'

interface Props {
  innerRef?: any
  style?: any
  id?: string
  className?: string
  children?: ReactNode
  onClick?: (event: any) => void
}

interface TableProps extends Props {
  isLoading?: boolean
  responsive?: boolean
  scrollable?: boolean
  bordered?: boolean
  hover?: boolean
}

interface TfootProps extends Props {
  size: 'md' | 'lg'
}

interface TrProps extends Props {
  stroke?: 'success' | 'helper' | 'warning'
  highlight?: 'success' | 'helper' | 'warning'
}

interface ThProps extends Props {
  colSpan?: number
  order?: IOrder
  orderBy?: string
  onChange?: (order: IOrder, orderBy: string) => void
}

interface TdProps extends Props {
  colSpan?: number
  showOnHover?: boolean
  style?: React.CSSProperties
}

function Table({
  innerRef,
  isLoading,
  responsive,
  scrollable,
  bordered,
  hover,
  children,
  ...props
}: TableProps) {
  if (!scrollable) {
    return (
      <Wrapper responsive={responsive} bordered={bordered}>
        <Container
          {...props}
          ref={innerRef}
          isLoading={isLoading}
          hover={hover}
        >
          {children}
        </Container>
      </Wrapper>
    )
  }

  return (
    <Wrapper bordered={bordered}>
      <Scrollable>
        <Container
          ref={innerRef}
          isLoading={isLoading}
          scrollable={true}
          hover={hover}
          {...props}
        >
          {children}
        </Container>
      </Scrollable>
    </Wrapper>
  )
}

function Thead({ innerRef, children, ...props }: Props) {
  return (
    <thead ref={innerRef} {...props}>
      {children}
    </thead>
  )
}

function Tbody({ innerRef, children, ...props }: Props) {
  return (
    <tbody ref={innerRef} {...props}>
      {children}
    </tbody>
  )
}

function Tfoot({ innerRef, size, children, ...props }: TfootProps) {
  return (
    <tfoot ref={innerRef} className={`size-${size}`} {...props}>
      {children}
    </tfoot>
  )
}

function Tr({
  innerRef,
  stroke,
  highlight,
  style,
  className,
  children,
  ...props
}: TrProps) {
  const classes = `${className || ''} 
    ${highlight ? `highlight-${highlight}` : ''}
    ${stroke ? `stroke-${stroke}` : ''}`

  return (
    <tr ref={innerRef} style={style} className={classes} {...props}>
      {children}
    </tr>
  )
}

function Th({
  colSpan,
  order,
  orderBy,
  onChange,
  innerRef,
  children,
  ...props
}: ThProps) {
  const [currentOrder, setCurrentOrnder] = useState<IOrder>(order)

  function handleOnClick() {
    if (onChange && orderBy) {
      let order: IOrder

      switch (currentOrder) {
        case 'asc':
          order = 'desc'
          break

        case 'desc':
          order = undefined
          break

        case undefined:
          order = 'asc'
          break

        default:
          break
      }

      setCurrentOrnder(order)

      onChange(order, orderBy)
    }
  }

  return onChange ? (
    <th ref={innerRef} colSpan={colSpan} {...props}>
      <Order order={currentOrder} onClick={() => handleOnClick()}>
        {children}
      </Order>
    </th>
  ) : (
    <th ref={innerRef} colSpan={colSpan} {...props}>
      {children}
    </th>
  )
}

function Td({
  colSpan,
  showOnHover,
  style,
  innerRef,
  children,
  ...props
}: TdProps) {
  return showOnHover ? (
    <td ref={innerRef} colSpan={colSpan} style={style} {...props}>
      <div className="show-on-hover">{children}</div>
    </td>
  ) : (
    <td ref={innerRef} colSpan={colSpan} style={style} {...props}>
      {children}
    </td>
  )
}

Table.defaultProps = {
  isLoading: undefined,
  responsive: undefined,
  scrollable: undefined,
  bordered: undefined,
  hover: undefined,
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Thead.defaultProps = {
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Tbody.defaultProps = {
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Tfoot.defaultProps = {
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Tr.defaultProps = {
  stroke: undefined,
  highlight: undefined,
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Th.defaultProps = {
  colSpan: undefined,
  order: undefined,
  orderBy: undefined,
  onChange: undefined,
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

Td.defaultProps = {
  colSpan: undefined,
  showOnHover: undefined,
  style: undefined,
  id: undefined,
  className: undefined,
  innerRef: undefined,
  children: undefined,
  onClick: undefined
}

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td }
