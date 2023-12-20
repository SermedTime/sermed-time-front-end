import styled, { css } from 'styled-components'

interface Props {
  error?: boolean
  disabled?: boolean
}

export const UploadBox = styled.div<Props>`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-style: dashed;
    border-radius: ${props.theme.border.radius.md};
    border-width: ${props.theme.border.width.thin};

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;

    height: 14rem;
    width: 100%;

    cursor: pointer;

    ${props.disabled &&
    css`
      border-color: ${props.theme.colors.neutral.low.medium};
      pointer-events: none;
    `}
  `}
`

export const UploadWrapper = styled.div<Props>`
  ${props => css`
    ${props.error &&
    css`
      ${UploadBox} {
        background-color: ${props.theme.colors.feedback.helper.light};
        border-color: ${props.theme.colors.feedback.helper.pure};
      }
    `}
  `}
`
