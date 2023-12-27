import styled, { css } from 'styled-components'

import { rgba } from 'polished'

import BrandLogo from '@/assets/images/logo.png'

interface ContainerProps {
  hover: boolean
}

interface ItemProps {
  active?: boolean
}

export const Container = styled.nav<ContainerProps>`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.light};
    box-shadow: ${props.theme.shadow.level.two};

    border-top-right-radius: 1.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1090;

    padding: 2rem 1.5rem;

    height: 100vh;
    width: ${props.theme.spacing.xxl};

    transition: width 250ms ease;

    @media (min-width: ${props.theme.breakpoints.lg}) {
      padding: 2rem 1rem;
    }

    @media (min-width: ${props.theme.breakpoints.xxl}) {
      width: ${props.theme.spacing.xxxl};
    }

    ${props.hover &&
    css`
      width: 288px !important;
    `}
  `}
`

export const Brand = styled.div`
  background-image: url(${BrandLogo});
  background-repeat: no-repeat;
  height: 75px;
  width: 64px;

  transition: width 250ms ease;

  &.open {
    width: 256px;
  }
`

export const List = styled.ul`
  ${props => css`
    overflow-y: auto;
    overflow-x: hidden;

    margin-top: 1.5rem;

    height: 100vh;
    width: 72px;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: ${props.theme.border.radius.sm};
      margin: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${rgba(
        props.theme.colors.neutral.low.dark,
        props.theme.opacity.level.intense
      )};
      border-radius: ${props.theme.border.radius.sm};
    }

    li {
      a,
      div > div {
        padding: 0 1.5rem;

        span:nth-child(2) {
          opacity: 0;
          visibility: hidden;

          transition:
            visibility 0s,
            opacity 500ms linear;
        }
      }

      div {
        position: relative;

        &::after {
          font-family: 'Material Icons';
          font-size: 1rem;

          content: 'keyboard_arrow_down';

          position: absolute;
          top: 0.8125rem;
          right: 1.5rem;

          opacity: 0;
          visibility: hidden;

          transition:
            visibility 0s,
            opacity 500ms linear;
        }
      }
    }

    &.open {
      width: 255px;

      li {
        a,
        div > div {
          padding: 0 0 0 1.5rem;

          span:nth-child(2) {
            opacity: 1;
            visibility: visible;
          }
        }

        div {
          &::after {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  `}
`

export const Item = styled.li<ItemProps>`
  ${props => css`
    min-height: 48px;
    width: 100%;

    + li {
      margin-top: 0.5rem;
    }

    a,
    div > div {
      border-radius: ${props.theme.border.radius.sm};

      display: flex;
      align-items: center;

      min-height: 48px;
      width: 100%;

      outline: unset;

      span {
        color: ${rgba(props.theme.colors.neutral.low.dark, 0.72)} !important;

        ${props.active &&
        css`
          color: ${props.theme.colors.neutral.low.dark} !important;
        `}
      }

      span:nth-child(2) {
        font-family: ${props.theme.font.family.base};
        font-size: ${props.theme.font.size.xs};
        font-weight: ${props.theme.font.weight.regular};
        line-height: ${props.theme.line.height.default};
        margin-left: 1rem;
      }
    }

    a {
      background-color: transparent;

      transition: background-color 250ms ease;

      &:hover {
        background-color: ${props.theme.colors.neutral.high.pure};

        span {
          color: ${props.theme.colors.neutral.low.dark} !important;
        }
      }
    }

    div {
      &:hover {
        div {
          span {
            color: ${props.theme.colors.neutral.low.dark} !important;
          }
        }

        ul {
          visibility: visible;
          opacity: 1;
          max-height: 300px;

          transition:
            visibility 0s,
            opacity 250ms ease,
            max-height 250ms linear;
        }
      }

      &:hover,
      :focus-within {
        div {
          background-color: ${rgba(
            props.theme.colors.neutral.high.dark,
            props.theme.opacity.level.intense
          )};
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  `}
`

export const SubList = styled.ul`
  visibility: hidden;
  opacity: 0;

  max-height: 0;
  height: auto;
  width: 100%;
`

export const SubItem = styled.li`
  ${props => css`
    background-color: ${rgba(
      props.theme.colors.neutral.high.dark,
      props.theme.opacity.level.medium
    )};

    height: 56px;
    width: 100%;

    a {
      padding: 0 2.5rem 0 3rem;

      height: 100%;

      &:hover {
        background-color: transparent;
      }
    }
  `}
`
