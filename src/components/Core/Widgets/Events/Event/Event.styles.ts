import styled, { css } from 'styled-components'

interface Props {
  type: string
}

export const Container = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.medium};
    border-radius: ${props.theme.border.radius.md};
    padding: 1rem;

    display: flex;

    &:hover {
      cursor: pointer;
    }
  `}
`

export const Identifier = styled.div<Props>`
  ${props => css`
    border-radius: ${props.theme.border.radius.pill};
    margin-right: 0.5rem;
    min-height: 1rem;
    min-width: 0.25rem;

    ${props.type === 'green' &&
    css`
      background-color: ${props.theme.colors.feedback.success.pure};
    `}

    ${props.type === 'yellow' &&
    css`
      background-color: ${props.theme.colors.feedback.helper.pure};
    `}
  `}
`
