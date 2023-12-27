import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.sm};
    border-width: ${props.theme.border.width.none};

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;

    height: 3rem;
    width: 100%;

    &:hover {
      cursor: default !important;
    }

    span {
      margin-left: 1rem;
    }
  `}
`

export const User = styled.div`
  display: flex;
  align-items: center;
  max-width: 75%;
`

export const Avatar = styled.div`
  margin-right: 1rem;
`

export const Username = styled.div`
  ${props => css`
    color: ${rgba(
      props.theme.colors.neutral.low.pure,
      props.theme.opacity.level.semiopaque
    )};
    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xs};
    font-weight: ${props.theme.font.weight.bold};
    line-height: ${props.theme.line.height.default};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`
