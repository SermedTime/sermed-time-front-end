import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Separator = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.sm};
    margin: 0 0.25rem;
    height: 0.125rem;
    width: 0.5rem;
  `}
`
