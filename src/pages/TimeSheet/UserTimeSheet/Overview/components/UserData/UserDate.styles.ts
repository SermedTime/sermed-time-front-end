import styled, { css } from 'styled-components'

export const TagText = styled.div`
  ${props => css`
    color: ${props.theme.colors.neutral.low.pure};
    margin-right: 0.5rem;
  `}
`
