import { createGlobalStyle, css } from 'styled-components'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-multi-carousel/lib/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import '../assets/fonts/styles.css'

export default createGlobalStyle`
  ${props => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: ${props.theme.font.family.base};
      font-size: ${props.theme.font.size.xs};

      overflow-x: hidden;

      &.no-overflow {
        overflow: hidden;
        padding-right: 17px;
      }
    }

    ol,
    ul,
    dl {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    p {
      margin: 0;
    }

    button {
      cursor: pointer;
    }

    a {
      text-decoration: unset;
    }

    b {
      font-weight: 600;
    }

    strong {
      font-weight: 700;
    }
  `}
`
