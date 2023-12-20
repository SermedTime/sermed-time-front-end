import { Container } from './ItemList.styles'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: 'transparent'
}

export function DataItemList({ bgColor, children, ...props }: Props) {
  return (
    <Container bgColor={bgColor} {...props}>
      {children}
    </Container>
  )
}

DataItemList.defaultProps = {
  bgColor: undefined
}
