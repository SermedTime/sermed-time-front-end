import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  hasValue: boolean
  error?: boolean
  readOnly?: boolean
  disabled?: boolean
}

export const Container = styled.div<Props>`
  ${props => css`
    position: relative;
    width: 100%;

    ${(props.readOnly || props.disabled) &&
    css`
      .text-area {
        textarea {
          cursor: default;
          pointer-events: none;
        }
      }
    `}

    .text-area {
      ${props.disabled &&
      css`
        opacity: ${props.theme.opacity.level.medium};
      `}

      textarea::-ms-reveal,
      textarea::-ms-clear {
        display: none;
      }

      textarea {
        background-color: transparent;

        border-color: ${props.theme.colors.neutral.low.pure};
        border-radius: ${props.theme.border.radius.sm};
        border-style: solid;
        border-width: ${props.theme.border.width.hairline};

        color: ${props.theme.colors.neutral.low.pure};
        font-family: ${props.theme.font.family.base};
        font-size: ${props.theme.font.size.xs};
        font-weight: ${props.theme.font.weight.regular};
        line-height: ${props.theme.line.height.lg};

        padding: 1rem;

        min-height: 6.875rem;
        width: 100%;

        transition-property: background-color;
        transition-duration: 0.6s;
        transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

        ${props.error &&
        css`
          background-color: ${props.theme.colors.feedback.helper.light};
          border-color: ${props.theme.colors.feedback.helper.pure};
        `}

        &::placeholder {
          color: ${props.theme.colors.neutral.low.pure};
        }

        &:read-only {
          background-color: ${rgba(
            props.theme.colors.neutral.low.pure,
            props.theme.opacity.level.semitransparent
          )};
          border-color: ${rgba(
            props.theme.colors.neutral.low.pure,
            props.theme.opacity.level.medium
          )};
          color: ${rgba(
            props.theme.colors.neutral.low.pure,
            props.theme.opacity.level.semiopaque
          )};
        }

        &:hover:not([disabled]) {
          ${props.error
            ? css`
                background-color: ${props.theme.colors.feedback.helper.light};
                border-color: ${props.theme.colors.feedback.helper.pure};
                color: ${props.theme.colors.feedback.helper.light};
              `
            : css`
                background-color: ${rgba(
                  props.theme.colors.neutral.low.pure,
                  props.theme.opacity.level.semitransparent
                )};

                &::placeholder {
                  color: ${props.theme.colors.neutral.low.pure};
                }
              `}
        }

        &:focus-visible {
          outline: none;
        }

        &:disabled {
          cursor: not-allowed;
        }

        &::-webkit-scrollbar {
          width: 0.25rem;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
          border-radius: ${props.theme.border.radius.sm};
          margin: 1rem;
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${rgba(
            props.theme.colors.neutral.low.dark,
            props.theme.opacity.level.intense
          )};
          border-radius: ${props.theme.border.radius.sm};
        }
      }
    }
  `}
`
