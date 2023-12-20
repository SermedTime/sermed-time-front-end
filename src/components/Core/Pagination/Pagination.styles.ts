import styled, { css } from 'styled-components'

interface ItemProps {
  active: boolean
}

export const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const Controller = styled.li`
  padding: 0 2rem;
`

export const Item = styled.li<ItemProps>`
  ${props => css`
    ${props.active
      ? css`
          background-color: ${props.theme.colors.neutral.low.pure};
        `
      : css`
          background-color: ${props.theme.colors.brand.primary.pure};
        `}

    border-radius: ${props.theme.border.radius.sm};
    color: ${props.theme.colors.neutral.high.pure};
    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xxs};
    font-weight: ${props.theme.font.weight.regular};
    line-height: ${props.theme.line.height.default};

    margin: 0 0.125rem;
    min-width: 2rem;
    padding: 0.25rem 0.5rem;
    text-align: center;

    cursor: pointer;
  `}
`
