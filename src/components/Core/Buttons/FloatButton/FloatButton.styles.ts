import styled, { css } from 'styled-components'

interface Props {
  styles: 'primary' | 'secondary'
}

export const Button = styled.button<Props>`
  ${props => css`
    border: unset;
    border-radius: ${props.theme.border.radius.circular};

    display: flex;
    align-items: center;
    justify-content: center;

    height: 4rem;
    width: 4rem;

    ${props.styles === 'primary' &&
    css`
      background-color: ${props.theme.colors.brand.primary.pure};
    `}

    ${props.styles === 'secondary' &&
    css`
      background-color: ${props.theme.colors.neutral.low.pure};
    `}

    > span {
      color: ${props.theme.colors.neutral.high.pure};
    }
  `}
`
