import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  bgColor?: 'transparent'
}

export const Container = styled.div<Props>`
  ${props => css`
    border-radius: ${props.theme.border.radius.sm};
    padding: 1rem;

    ${!props.bgColor &&
    css`
      background-color: ${props.theme.colors.neutral.high.pure};

      transition: background-color 500ms ease;

      &:hover {
        background-color: ${rgba(
          props.theme.colors.neutral.low.pure,
          props.theme.opacity.level.semitransparent
        )};
      }
    `}
  `}
`
