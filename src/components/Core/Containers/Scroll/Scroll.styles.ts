import styled, { css } from 'styled-components'

import { rgba } from 'polished'

export const Container = styled.div`
  overflow: auto;
`

export const Scrollable = styled.div`
  ${props => css`
    height: 25rem;
    padding-right: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: ${props.theme.border.radius.sm};
      margin: 1.35rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${rgba(
        props.theme.colors.neutral.low.dark,
        props.theme.opacity.level.intense
      )};
      border-radius: ${props.theme.border.radius.sm};
    }
  `}
`
