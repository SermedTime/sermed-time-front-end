import styled, { css } from 'styled-components'

import { rgba } from 'polished'

import { animated } from 'react-spring'

export const Container = styled(animated.div)`
  ${props => css`
    backdrop-filter: blur(${props.theme.background.blur.level.two});
    background-color: ${rgba(
      props.theme.colors.neutral.low.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.md};
    box-shadow: ${props.theme.shadow.level.three};

    position: relative;
    padding: 2.5rem;

    width: 640px;

    & + div {
      margin-top: 0.5rem;
    }

    .title {
      div {
        color: ${props.theme.colors.neutral.high.pure};
      }
    }

    .close-button {
      button {
        span {
          color: ${props.theme.colors.neutral.high.dark};
        }
      }
    }

    .description {
      div {
        color: ${rgba(
          props.theme.colors.neutral.high.pure,
          props.theme.opacity.level.semiopaque
        )};
      }
    }

    .cancel-button {
      button {
        color: ${props.theme.colors.neutral.high.pure};
      }
    }
  `}
`
