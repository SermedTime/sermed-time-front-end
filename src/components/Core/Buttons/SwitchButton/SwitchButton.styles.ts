import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.sm};
    border-style: solid;
    border-width: ${props.theme.border.width.hairline};

    overflow: auto;

    button {
      background-color: transparent;
      border: unset;
      color: ${props.theme.colors.neutral.low.pure};

      font-family: ${props.theme.font.family.base};
      font-size: ${props.theme.font.size.xxs};
      font-weight: ${props.theme.font.weight.regular};

      height: 2rem;

      padding: 0.25rem 1rem;

      &.active {
        background-color: ${props.theme.colors.neutral.low.pure};
        color: ${props.theme.colors.neutral.high.pure};

        &:nth-child(1) {
          border-top-right-radius: ${props.theme.border.radius.sm};
          border-bottom-right-radius: ${props.theme.border.radius.sm};
        }

        &:nth-child(2) {
          border-top-left-radius: ${props.theme.border.radius.sm};
          border-bottom-left-radius: ${props.theme.border.radius.sm};
        }
      }
    }
  `}
`
