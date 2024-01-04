import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface AvatarProps {
  status: string
}

interface InsuredProps {
  status: 'active' | 'inactive'
}

export const Card = styled.div`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.md};
    box-shadow: ${props.theme.shadow.level.one};
    margin-bottom: 1.5rem;
    padding: 1rem;
  `}
`

export const List = styled.div`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.pure,
      props.theme.opacity.level.intense
    )};
    backdrop-filter: blur(${props.theme.background.blur.level.one});
    border-radius: ${props.theme.border.radius.md};
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
  `}
`

export const Avatar = styled.div<AvatarProps>`
  ${props => css`
    background-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.circular};

    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.5rem;
    width: 2.5rem;

    position: relative;

    > span {
      color: ${props.theme.colors.neutral.high.dark};
    }

    &::before {
      border-radius: ${props.theme.border.radius.circular};
      content: '';

      height: 1rem;
      width: 1rem;

      position: absolute;
      top: -0.125rem;
      right: -0.125rem;

      ${props.status === 'active' &&
      css`
        background-color: ${props.theme.colors.feedback.success.pure};
      `}

      ${props.status === 'inactive' &&
      css`
        background-color: ${props.theme.colors.feedback.warning.pure};
      `}

      ${props.status === 'prospective' &&
      css`
        background-color: ${props.theme.colors.feedback.helper.pure};
      `}
    }
  `}
`

export const Insured = styled.div<InsuredProps>`
  ${props => css`
    font-family: ${props.theme.font.family.highlight};
    font-size: ${props.theme.font.size.xxs};
    font-weight: ${props.theme.font.weight.regular};
    line-height: ${props.theme.line.height.lg};

    ${props.status === 'active'
      ? css`
          color: ${props.theme.colors.feedback.success.pure};
          margin-left: 0.25rem;
        `
      : css`
          color: ${props.theme.colors.neutral.low.pure};
          margin-left: 1.5625rem;
        `}
  `}
`
