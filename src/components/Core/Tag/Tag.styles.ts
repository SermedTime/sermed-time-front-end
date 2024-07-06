import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  display?: string
  disabled?: boolean
  highlight?: boolean
  status?:
    | 'default'
    | 'success'
    | 'helper'
    | 'warning'
    | 'neutral'
    | 'brand-secondary-pure'
  hover?: boolean
}

export const Container = styled.div<Props>`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.pill};
    border-style: solid;
    border-width: ${props.theme.border.width.hairline};

    color: ${props.theme.colors.neutral.low.pure};

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xs};
    font-weight: ${props.theme.font.weight.medium};
    line-height: ${props.theme.line.height.lg};

    cursor: ${props.hover ? 'pointer' : 'default'};

    padding: 0.25rem 1rem;
    text-align: center;
    height: 1.75rem;
    min-width: 5.875rem;
    width: fit-content;

    transition: all 250ms ease;

    span {
      transition: all 250ms ease;
    }

    ${props.display === 'auto' &&
    css`
      display: auto;
      min-width: auto;
    `}

    ${props.highlight
      ? css`
          background-color: ${props.theme.colors.highlight.pure};
          border-color: ${props.theme.colors.highlight.pure};
          color: ${props.theme.colors.neutral.high.pure};
        `
      : css`
          ${props.status === 'default' &&
          css`
            background-color: ${props.theme.colors.brand.secondary.light};
            border-color: ${props.theme.colors.brand.secondary.light};
            color: ${props.theme.colors.brand.secondary.dark};
          `}

          ${props.status === 'success' &&
          css`
            background-color: ${props.theme.colors.feedback.success.light};
            border-color: ${props.theme.colors.feedback.success.light};
            color: ${props.theme.colors.feedback.success.dark};
          `}

          ${props.status === 'helper' &&
          css`
            background-color: ${props.theme.colors.feedback.helper.light};
            border-color: ${props.theme.colors.feedback.helper.light};
            color: ${props.theme.colors.feedback.helper.dark};
          `}

          ${props.status === 'warning' &&
          css`
            background-color: ${props.theme.colors.feedback.warning.light};
            border-color: ${props.theme.colors.feedback.warning.light};
            color: ${props.theme.colors.feedback.warning.dark};
          `}

          ${props.status === 'neutral' &&
          css`
            background-color: ${props.theme.colors.brand.primary.pure};
            border-color: ${props.theme.colors.brand.primary.pure};
            color: ${props.theme.colors.neutral.high.pure};
          `}

          ${props.status === 'brand-secondary-pure' &&
          css`
            background-color: ${props.theme.colors.brand.secondary.pure};
            border-color: ${props.theme.colors.brand.secondary.pure};
            color: ${props.theme.colors.neutral.high.pure};
          `}

          ${props.disabled &&
          css`
            background-color: ${rgba(
              props.theme.colors.neutral.low.pure,
              props.theme.opacity.level.semitransparent
            )};
            color: ${rgba(
              props.theme.colors.neutral.low.pure,
              props.theme.opacity.level.medium
            )};

            &:hover {
              cursor: not-allowed;
            }
          `}
        `}
  `}
`
