import styled, { css } from 'styled-components'

export const Background = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.pure};
    border-radius: ${props.theme.border.radius.lg};
    padding: 3rem 2rem;
  `}
`
