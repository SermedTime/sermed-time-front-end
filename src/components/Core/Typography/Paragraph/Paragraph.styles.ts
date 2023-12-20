import styled, { css } from 'styled-components'

interface Props {
  size: 'sm' | 'lg'
}

export const Container = styled.div<Props>`
  ${props => css`
    color: ${props.theme.colors.neutral.low.pure};
    font-family: ${props.theme.font.family.base};
    font-weight: ${props.theme.font.weight.regular};
    opacity: ${props.theme.opacity.level.semiopaque};

    ${props.size === 'sm' &&
    css`
      font-size: ${props.theme.font.size.xs};
      line-height: ${props.theme.line.height.lg};
    `}

    ${props.size === 'lg' &&
    css`
      font-size: ${props.theme.font.size.sm};
      line-height: ${props.theme.line.height.sm};
    `}
  `}
`
