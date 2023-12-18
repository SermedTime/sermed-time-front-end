import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${props => css`
    .amcharts {
      position: relative;

      &::after {
        content: '';

        background-color: ${props.theme.background.color.primary.pure};

        position: absolute;
        bottom: 0;

        height: 1.375rem;
        width: 4rem;

        &:hover {
          cursor: normal;
          pointer-events: none;
        }
      }
    }

    .amcharts-modal {
      position: relative;

      &::after {
        content: '';

        background-color: #e4e4e6;

        position: absolute;
        bottom: 0;

        height: 1.375rem;
        width: 4rem;

        &:hover {
          cursor: normal;
          pointer-events: none;
        }
      }
    }
  `}
`
