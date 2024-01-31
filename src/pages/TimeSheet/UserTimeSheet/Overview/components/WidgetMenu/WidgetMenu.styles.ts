import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface ItemProps {
  active: boolean
}

export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  right: -0.8125rem;

  width: 100%;
`

export const Container = styled.div`
  position: relative;
  right: -2rem;

  width: 100%;
`

export const Menu = styled.ul`
  position: absolute;
  /* z-index: 1010; */
  z-index: auto;

  height: 100%;
  width: 100%;
`

export const Item = styled.li<ItemProps>`
  ${props => css`
    ${!props.active &&
    css`
      > div {
        color: ${rgba(
          props.theme.colors.neutral.low.pure,
          props.theme.opacity.level.intense
        )};
      }
    `}

    display: flex;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;

    &:nth-child(1) {
      margin-top: 2px;

      @media (min-width: ${props.theme.breakpoints.lg}) {
        margin-left: 90px;
      }

      @media (min-width: ${props.theme.breakpoints.xxl}) {
        margin-left: 30px;
      }
    }

    &:nth-child(2) {
      margin-top: 3.025rem;

      @media (min-width: ${props.theme.breakpoints.lg}) {
        margin-left: -0.75rem;
      }

      @media (min-width: ${props.theme.breakpoints.xxl}) {
        margin-left: -0.75rem;
      }
    }

    &:nth-child(3) {
      margin-top: 53px;

      @media (min-width: ${props.theme.breakpoints.lg}) {
        margin-left: 90px;
      }

      @media (min-width: ${props.theme.breakpoints.xxl}) {
        margin-left: 20px;
      }
    }
  `}
`

export const CircleBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

export const LightCircle = styled.div`
  ${props => css`
    border: 2px solid ${props.theme.colors.feedback.success.pure};
    border-bottom-left-radius: 260px;
    border-top-left-radius: 260px;
    border-right: 0;

    display: flex;
    justify-content: end;
    align-items: center;

    height: 200px;
    width: 120px;
  `}
`

export const BoldCircle = styled.div`
  ${props => css`
    border: 32px solid ${props.theme.colors.feedback.success.pure};
    border-bottom-left-radius: 200px;
    border-top-left-radius: 200px;
    border-right: 0;

    height: 140px;
    width: 90px;
  `}
`
