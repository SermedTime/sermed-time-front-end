import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.pure};
    border-radius: ${props.theme.border.radius.md};
    box-shadow: ${props.theme.shadow.level.two};
    padding: 1rem;
  `}
`
