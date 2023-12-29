import styled, { css } from 'styled-components'

import { rgba } from 'polished'

export const Container = styled.div`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.md};

    @media (min-width: ${props.theme.breakpoints.lg}) {
      padding: 1rem;
    }

    @media (min-width: ${props.theme.breakpoints.xxl}) {
      padding: 1.5rem;
    }
  `}
`

export const IconWrapper = styled.div`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.sm};
    border-style: solid;
    border-width: ${props.theme.border.width.thin};

    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    width: 40px;
  `}
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  height: 44px;
`
