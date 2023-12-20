import styled, { css } from 'styled-components'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export const Container = styled.div<Props>`
  ${props => css`
    background-color: ${props.theme.background.color.primary.pure};
    border-radius: ${props.theme.border.radius.md};

    ${props.size === 'sm' &&
    css`
      padding: 1rem 0.75rem;
    `}

    ${(!props.size || props.size === 'md') &&
    css`
      padding: 2rem 1.5rem;
    `}

    ${props.size === 'lg' &&
    css`
      padding: 2.5rem 2rem;
    `}
  `}
`
