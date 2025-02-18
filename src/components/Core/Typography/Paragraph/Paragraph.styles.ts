import styled, { css } from 'styled-components'

interface Props {
  size: 'sm' | 'lg'
  color?: 'neutral' | 'warning' | 'success'
}

export const Container = styled.div<Props>`
  ${props => css`
    color: ${props.theme.colors.neutral.low.pure};
    font-family: ${props.theme.font.family.base};
    font-weight: ${props.theme.font.weight.regular};
    opacity: ${props.theme.opacity.level.semiopaque};

    &.absence {
      color: ${props.theme.colors.feedback.warning.pure};
      font-weight: ${props.theme.font.weight.bold};
    }

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

    ${props.color === 'warning' &&
    css`
      color: ${props.theme.colors.feedback.warning.pure};
    `}

    ${props.color === 'success' &&
    css`
      color: ${props.theme.colors.feedback.success.pure};
    `}
  `}
`
