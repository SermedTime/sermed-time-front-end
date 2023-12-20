import styled, { css } from 'styled-components'

interface Props {
  type: string
}

export const Container = styled.button`
  background-color: transparent;
  border: unset;

  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;
`

export const Stack = styled.div`
  display: flex;
  align-items: center;

  margin-right: 0.25rem;
`

export const Identifier = styled.div<Props>`
  ${props => css`
    border-radius: ${props.theme.border.radius.pill};
    margin-right: 0.25rem;
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
