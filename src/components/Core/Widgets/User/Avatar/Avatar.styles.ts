import styled, { css } from 'styled-components'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export const Container = styled.div<Props>`
  ${props => css`
    background-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.circular};

    display: flex;
    align-items: center;
    justify-content: center;

    ${props.size === 'sm' &&
    css`
      height: 2rem;
      width: 2rem;
    `}

    ${props.size === 'md' &&
    css`
      height: 4rem;
      width: 4rem;
    `}

    ${(!props.size || props.size === 'lg') &&
    css`
      height: 6rem;
      width: 6rem;
    `}

    > span {
      color: ${props.theme.colors.neutral.high.dark};
    }
  `}
`
