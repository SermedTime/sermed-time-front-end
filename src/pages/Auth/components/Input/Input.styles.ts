import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  hasValue: boolean
  error?: boolean
  disabled?: boolean
}

export const Container = styled.div<Props>`
  ${props => css`
    position: relative;
    width: 100%;

    .input {
      input::-ms-reveal,
      input::-ms-clear {
        display: none;
      }

      input {
        background-color: transparent;

        border-color: ${props.theme.colors.neutral.low.pure};
        border-radius: ${props.theme.border.radius.sm};
        border-style: solid;
        border-width: ${props.theme.border.width.hairline};

        color: ${props.theme.colors.neutral.low.pure};
        font-family: ${props.theme.font.family.base};
        font-size: ${props.theme.font.size.xs};
        font-weight: ${props.theme.font.weight.regular};
        line-height: ${props.theme.line.height.default};

        height: 4rem;
        padding: 2rem 3.125rem 1rem 1rem;
        width: 100%;

        transition-duration: 0.6s;
        transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

        ${props.error &&
        css`
          border-color: ${props.theme.colors.feedback.helper.pure};
          background-color: ${props.theme.colors.feedback.helper.light};
        `}

        &:hover:not([disabled]) {
          border-color: #ab2292;
        }

        &:focus,
        :focus-visible {
          border-color: #ab2292;
          outline: none;
        }

        &:disabled {
          border-color: ${rgba(
            props.theme.colors.neutral.low.pure,
            props.theme.opacity.level.medium
          )};
          color: ${rgba(
            props.theme.colors.neutral.low.pure,
            props.theme.opacity.level.medium
          )};
          cursor: not-allowed;
        }
      }

      label {
        position: absolute;
        left: 1rem;
        top: 1.25rem;

        transition-duration: 0.6s;
        transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

        ${props.hasValue &&
        css`
          top: 0.5rem;
        `}

        span {
          font-size: ${props.theme.font.size.xs};
          line-height: ${props.theme.line.height.lg};

          ${props.hasValue &&
          css`
            color: ${rgba(props.theme.colors.neutral.low.pure, 0.72)};
            font-size: ${props.theme.font.size.xxs};
            line-height: ${props.theme.line.height.md};
          `}

          ${props.disabled &&
          css`
            color: ${rgba(props.theme.colors.neutral.low.pure, 0.32)};
            cursor: not-allowed;
          `}
        }
      }

      input:focus + label {
        top: 0.5rem;

        span {
          font-size: ${props.theme.font.size.xxs};
        }
      }

      div.show-password {
        cursor: pointer;
        user-select: none;

        height: 24px;
        width: 24px;

        position: absolute;
        right: 1rem;
        top: 1.275rem;
      }
    }
  `}
`
