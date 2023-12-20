import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface WrapperProps {
  open: boolean
}

interface ListProps {
  display?: 'block'
}

interface ItemProps {
  danger?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${props =>
    props.open &&
    css`
      position: relative;

      ul {
        visibility: visible;
        opacity: 1;
        max-height: 1000px;
      }
    `}
`

export const Container = styled.div`
  position: absolute;
  z-index: 1030;

  padding-top: 0.5rem;
  width: inherit;
  min-width: 13.5rem;
`

export const List = styled.ul<ListProps>`
  ${props => css`
    backdrop-filter: blur(${props.theme.background.blur.level.two});
    background-color: ${rgba(
      props.theme.colors.neutral.low.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.sm};
    box-shadow: ${props.theme.shadow.level.two};

    visibility: hidden;
    opacity: 0;

    overflow: hidden;
    max-height: 0;
    width: 100%;

    ${props.display === 'block'
      ? css`
          min-width: 100%;
        `
      : css`
          min-width: 205px;
        `}

    transition: visibility 0s, opacity 250ms ease, max-height 250ms linear;
  `}
`

export const Item = styled.li<ItemProps>`
  ${props => css`
    cursor: pointer;

    span,
    div {
      ${props.danger
        ? css`
            color: ${props.theme.colors.highlight.light} !important;
          `
        : css`
            color: ${props.theme.colors.neutral.high.pure} !important;
          `}
    }

    span {
      margin-right: 1rem;
    }

    a {
      display: flex;
      align-items: center;

      padding: 1rem 1.5rem;

      width: 100%;
    }

    + li {
      border-top-color: ${props.theme.colors.neutral.low.light};
      border-top-style: solid;
      border-top-width: 2px;
    }

    &:hover {
      background-color: ${rgba(
        props.theme.colors.neutral.low.pure,
        props.theme.opacity.level.intense
      )};
    }
  `}
`

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 1.5rem;

  width: 100%;
`

export const Label = styled.div`
  ${props => css`
    font-family: ${props.theme.font.family.base};
    font-size: ${props.theme.font.size.xs};
    font-weight: ${props.theme.font.weight.regular};
    line-height: ${props.theme.line.height.default};
  `}
`
