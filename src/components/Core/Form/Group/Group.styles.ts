import styled, { css } from 'styled-components'

interface Props {
  size?: 'sm' | 'lg'
}

export const Wrapper = styled.div<Props>`
  ${props => css`
    user-select: none;

    label.form-label {
      div {
        font-weight: ${props.theme.font.weight.bold};

        ${props.size === 'sm' &&
        css`
          font-size: ${props.theme.font.size.xxs};
        `}

        ${(!props.size || props.size === 'lg') &&
        css`
          font-size: ${props.theme.font.size.xxs};
        `}
      }
    }
  `}
`

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  margin-bottom: 0.5rem;

  > div {
    opacity: 1;
  }
`
