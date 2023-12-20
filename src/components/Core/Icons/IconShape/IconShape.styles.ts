import styled, { css } from 'styled-components'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  mode?: 'success' | 'helper' | 'warning'
}

export const Container = styled.div<Props>`
  ${props => css`
    border-radius: ${props.theme.border.radius.circular};

    display: flex;
    align-items: center;
    justify-content: center;

    ${(!props.size || props.size === 'sm') &&
    css`
      height: 2rem;
      width: 2rem;
    `}

    ${props.size === 'md' &&
    css`
      height: 3rem;
      width: 3rem;
    `}

    ${props.size === 'lg' &&
    css`
      height: 4rem;
      width: 4rem;
    `}

    ${!props.mode &&
    css`
      background-color: ${props.theme.colors.brand.secondary.light};

      span {
        color: ${props.theme.colors.brand.secondary.pure};
      }
    `}

    ${props.mode === 'success' &&
    css`
      background-color: ${props.theme.colors.feedback.success.light};

      span {
        color: ${props.theme.colors.feedback.success.medium};
      }
    `}

    ${props.mode === 'helper' &&
    css`
      background-color: ${props.theme.colors.feedback.helper.light};

      span {
        color: ${props.theme.colors.feedback.helper.medium};
      }
    `}

    ${props.mode === 'warning' &&
    css`
      background-color: ${props.theme.colors.feedback.warning.light};

      span {
        color: ${props.theme.colors.feedback.warning.medium};
      }
    `}
  `}
`
