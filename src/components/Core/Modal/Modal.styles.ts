import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  mw?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Backdrop = styled.div<Props>`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.low.pure,
      props.theme.opacity.level.medium
    )};

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1090;

    height: 100%;
    width: 100%;

    overflow-x: hidden;
    overflow-y: auto;
  `}
`

export const Dialog = styled.div<Props>`
  ${props => css`
    display: flex;
    align-items: center;

    margin: 1.75rem auto;

    ${!props.mw &&
    css`
      max-width: calc(100% - 1rem);
    `}

    ${props.mw === 'sm' &&
    css`
      max-width: 600px;
    `}

    ${props.mw === 'md' &&
    css`
      max-width: 800px;
    `}

    ${props.mw === 'lg' &&
    css`
      max-width: 1000px;
    `}

    ${props.mw === 'xl' &&
    css`
      max-width: 1200px;
    `}



    width: auto;

    position: relative;
  `};

  max-width: ${props => props.mw || '1000px'};
`

export const Content = styled.div<Props>`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.pure,
      props.theme.opacity.level.semiopaque
    )};
    border-radius: ${props.theme.border.radius.lg};
    padding: 2.5rem;
    width: 100%;
    position: relative;

    ${(!props.blur || props.blur === 'sm') &&
    css`
      backdrop-filter: blur(${props.theme.background.blur.level.one});
    `}

    ${props.blur === 'md' &&
    css`
      backdrop-filter: blur(${props.theme.background.blur.level.two});
    `}

    ${props.blur === 'lg' &&
    css`
      backdrop-filter: blur(${props.theme.background.blur.level.three});
    `}

    ${props.blur === 'xl' &&
    css`
      backdrop-filter: blur(${props.theme.background.blur.level.four});
    `}
  `}
`

export const CloseButton = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`
