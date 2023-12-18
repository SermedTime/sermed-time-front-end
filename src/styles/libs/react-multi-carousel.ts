import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${props => css`
    .react-multi-carousel-dot {
      button {
        background-color: ${props.theme.colors.brand.secondary.light};
        border-color: ${props.theme.colors.brand.secondary.light};
        height: 0.5rem;
        width: 0.5rem;
      }

      &.active {
        button {
          background-color: ${props.theme.colors.neutral.low.pure};
          border-color: ${props.theme.colors.neutral.low.pure};
        }
      }
    }
  `}
`
