import styled, { css } from 'styled-components'

interface Props {
  status: 'success' | 'helper' | 'warning' | 'neutral'
}

export const Status = styled.div<Props>`
  ${props => css`
    height: 3.5rem;
    position: relative;
    text-align: center;

    &::after {
      border-radius: ${props.theme.border.radius.md};
      content: '';
      position: absolute;
      bottom: 0;
      left: calc(50% - 0.25rem);

      height: 0.25rem;
      width: 1rem;

      ${props.status === 'success' &&
      css`
        background-color: ${props.theme.colors.feedback.success.pure};
      `}

      ${props.status === 'helper' &&
      css`
        background-color: ${props.theme.colors.feedback.helper.pure};
      `}

      ${props.status === 'warning' &&
      css`
        background-color: ${props.theme.colors.feedback.warning.pure};
      `}

      

      ${props.status === 'neutral' &&
      css`
        background-color: ${props.theme.colors.neutral.low.pure};
      `}
    }
  `}
`
