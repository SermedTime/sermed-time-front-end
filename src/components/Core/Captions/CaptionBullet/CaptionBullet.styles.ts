import styled, { css } from 'styled-components'

interface Props {
  color: 'success' | 'helper' | 'warning' | 'default' | 'neutral'
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div {
    opacity: 1;
  }
`

export const Container = styled.div<Props>`
  ${props => css`
    border-style: solid;
    border-radius: ${props.theme.border.radius.circular};
    border-width: ${props.theme.border.width.hairline};

    height: 1rem;
    width: 1rem;

    ${props.color === 'success' &&
    css`
      background-color: ${props.theme.colors.feedback.success.light};
      border-color: ${props.theme.colors.feedback.success.pure};
    `}

    ${props.color === 'helper' &&
    css`
      background-color: ${props.theme.colors.feedback.helper.light};
      border-color: ${props.theme.colors.feedback.helper.pure};
    `}

    ${props.color === 'warning' &&
    css`
      background-color: ${props.theme.colors.feedback.warning.light};
      border-color: ${props.theme.colors.feedback.warning.pure};
    `}

    ${props.color === 'neutral' &&
    css`
      background-color: ${props.theme.colors.feedback.neutral.light};
      border-color: ${props.theme.colors.feedback.neutral.pure};
    `}

    ${props.color === 'default' &&
    css`
      background-color: ${props.theme.colors.neutral.low.light};
      border-color: ${props.theme.colors.neutral.low.pure};
    `}
  `}
`
