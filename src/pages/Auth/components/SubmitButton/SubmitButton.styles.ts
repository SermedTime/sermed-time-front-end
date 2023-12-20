import styled, { css } from 'styled-components'

import { rgba } from 'polished'

export const Button = styled.button`
  ${props => css`
    background-color: ${props.theme.colors.brand.primary.pure};
    border: unset;
    border-radius: 500px;
    color: ${props.theme.colors.neutral.high.pure};
    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xs};
    font-weight: ${props.theme.font.weight.bold};

    padding: 12px 24px;
    text-align: center;

    height: 4rem;
    width: 100%;

    &:disabled {
      background-color: ${rgba(props.theme.colors.neutral.low.pure, 0.16)};
      color: ${rgba(props.theme.colors.neutral.low.pure, 0.16)};

      cursor: not-allowed;
    }
  `}
`
