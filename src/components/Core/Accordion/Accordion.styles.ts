import styled, { css } from 'styled-components'

interface Props {
  open: boolean
  visible?: boolean
}

export const Container = styled.div<Props>`
  ${props => css`
    border-color: ${props.theme.colors.neutral.low.pure};
    border-radius: ${props.theme.border.radius.md};
    border-style: solid;
    border-width: ${props.theme.border.width.thin};
    user-select: none;
    width: 100%;

    ${props.open
      ? css`
          padding: 1rem 1.5rem;
        `
      : css`
          padding: 1rem 1.5rem;
        `}
  `}
`

export const Body = styled.div<Props>`
  ${props => css`
    visibility: hidden;
    opacity: 0;

    overflow: ${props.visible ? 'visible' : 'hidden'};
    max-height: 0;
    width: 100%;

    transition:
      visibility 0s,
      opacity 250ms ease,
      max-height 250ms linear;

    ${props.open &&
    css`
      visibility: visible;
      opacity: 1;
      max-height: 1000px;
    `}
  `}
`
