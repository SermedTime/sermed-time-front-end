'use client'

import styled, { css } from 'styled-components'

import { rgba } from 'polished'

export const MainContainer = styled.div`
  background-image: linear-gradient(321.77deg, #e3e0ff 74.96%, #ffffff 114.96%);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`

export const Wrapper = styled.div`
  height: 100%;
  width: 60%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`

export const LoginContainer = styled.div`
  height: 100%;
  width: 40%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const FormBox = styled.div`
  ${props => css`
    backdrop-filter: blur(${props.theme.background.blur.level.one});
    background-color: ${rgba(
      props.theme.colors.neutral.high.light,
      props.theme.opacity.level.intense
    )};
    border-radius: 3rem;

    height: 90%;
    width: 37.5rem;
    padding: 3.125rem 4.5rem;

    img {
      height: 8rem;
      width: 100%;
      border-radius: ${props.theme.border.radius.sm};
    }

    @media (max-width: 1366px) {
      width: 37.5rem;
      padding: 1.5rem 6rem;

      img {
        height: 3rem;
      }
    }
  `}
`
