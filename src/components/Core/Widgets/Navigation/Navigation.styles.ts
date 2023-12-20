import styled, { css } from 'styled-components'

interface Props {
  active: boolean
}

export const Item = styled.div<Props>`
  ${props => css`
    background-color: transparent;
    border-radius: ${props.theme.border.radius.sm};

    display: flex;
    align-items: center;

    padding: 0.5rem;

    cursor: pointer;

    & + div {
      margin-top: 0.5rem;
    }

    ${props.active &&
    css`
      background-color: ${props.theme.colors.neutral.high.pure};
    `}
  `}
`

export const Label = styled.div`
  ${props => css`
    color: ${props.theme.colors.neutral.low.pure};
    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xxs};
    font-weight: ${props.theme.font.weight.bold};
    line-height: ${props.theme.line.height.md};
    margin-left: 0.5rem;
  `}
`
