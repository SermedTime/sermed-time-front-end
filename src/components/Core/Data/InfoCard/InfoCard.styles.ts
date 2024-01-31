import styled, { css } from 'styled-components'

interface ContainerProps {
  indicator?: boolean
}

interface TextHeadingProps {
  color?: 'warning'
}

interface TextValueProps {
  color?: 'success' | 'warning'
}

export const Container = styled.div<ContainerProps>`
  ${props => css`
    position: relative;

    > div {
      position: relative;
      z-index: 1020;
    }

    ${props.indicator &&
    css`
      &::after {
        background-color: ${props.theme.colors.feedback.success.pure};
        border-radius: ${props.theme.border.radius.md};

        content: '';
        position: absolute;
        right: -0.5rem;
        top: 50%;
        z-index: 1010;

        transform: translateY(-50%);

        height: 65%;
        width: 1.5rem;
      }
    `}
  `}
`

export const TextHeading = styled.div<TextHeadingProps>`
  ${props => css`
    ${props.color === 'warning' &&
    css`
      > div {
        color: ${props.theme.colors.feedback.warning.pure};
      }
    `}
  `}
`

export const TextValue = styled.div<TextValueProps>`
  ${props => css`
    ${props.color === 'success' &&
    css`
      > div {
        color: ${props.theme.colors.feedback.success.pure};
      }
    `}

    ${props.color === 'warning' &&
    css`
      > div {
        color: ${props.theme.colors.feedback.warning.pure};
      }
    `}
  `}
`
