import { rgba } from 'polished'
import styled, { css } from 'styled-components'

interface Props {
  now: number
}

export const Container = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.medium};
    border-radius: ${props.theme.border.radius.lg};
    display: flex;
    height: 1rem;
    width: 100%;
  `}
`

export const Progress = styled.div<Props>`
  ${props => css`
    background-color: ${props.theme.colors.brand.secondary.light};
    border-radius: ${props.theme.border.radius.lg};
    box-shadow: 0 0 2rem
      ${rgba(
        props.theme.colors.brand.secondary.light,
        props.theme.opacity.level.medium
      )};
    height: 1rem;
    width: ${props.now}%;
  `}
`
