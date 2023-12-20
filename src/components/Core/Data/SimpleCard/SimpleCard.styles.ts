import styled, { css } from 'styled-components'

export const IconWrapper = styled.div`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.md};
    border-style: solid;
    border-width: ${props.theme.border.width.thin};

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 1rem;
    padding: 1rem;
  `}
`
