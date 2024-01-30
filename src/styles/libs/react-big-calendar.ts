import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${props => css`
    .rbc-calendar {
      height: 730px;

      .rbc-month-view {
        border: unset;

        .rbc-month-header {
          margin-bottom: 2rem;
        }
      }

      .rbc-header {
        border-color: ${props.theme.colors.neutral.low.pure};
        border-radius: ${props.theme.border.radius.sm};
        border-style: solid;
        border-width: ${props.theme.border.width.thin};

        margin: 0 0.125rem;
        padding: 0.5rem;
      }

      .rbc-month-row {
        border: unset;
        margin-bottom: 0.25rem;
      }

      .rbc-day-bg {
        border-color: ${props.theme.colors.neutral.low.pure};
        border-radius: ${props.theme.border.radius.sm};
        border-style: solid;
        border-width: ${props.theme.border.width.thin};

        cursor: default;

        margin: 0 0.125rem;

        &.rbc-today {
          background-color: ${props.theme.colors.neutral.high.light};
        }

        &.rbc-off-range-bg {
          background-color: transparent;
          cursor: default;
          pointer-events: none;
        }

        &.selected {
          background-color: ${props.theme.colors.neutral.low.pure};
        }
      }

      .rbc-date-cell {
        padding: 0;
        text-align: center;

        button {
          color: ${props.theme.colors.neutral.low.pure};
          font-size: ${props.theme.font.size.xxs};

          margin-top: 0.5rem;
          pointer-events: none;
        }

        &.rbc-current {
          button {
            color: ${props.theme.colors.neutral.high.pure};
          }
        }

        &.rbc-off-range {
          cursor: default;
          pointer-events: none;

          button {
            color: ${props.theme.colors.neutral.low.light};
          }
        }
      }

      .rbc-row-segment {
        padding: 0 0.25rem;
      }

      .rbc-show-more {
        background-color: ${props.theme.colors.highlight.pure};
        border-radius: ${props.theme.border.radius.pill};
        color: ${props.theme.colors.neutral.high.pure};

        font-family: ${props.theme.font.family.base};
        font-size: ${props.theme.font.size.xxs};
        font-weight: ${props.theme.font.weight.regular};

        cursor: default;

        margin: 0.5rem 0 0 0.75rem;
        padding: 0.125rem 0.5rem;
        width: fit-content;
      }

      .custom-event {
        background-color: transparent;
        outline: unset;
        padding: 0.125rem 0.75rem 0rem 0.75rem;

        color: ${props.theme.colors.neutral.low.pure};
        font-family: ${props.theme.font.family.base};
        font-size: ${props.theme.font.size.xxs};

        display: flex;
        align-items: center;

        pointer-events: none;

        &:before {
          border-radius: ${props.theme.border.radius.pill};
          content: '';
          display: inline-block;
          margin-right: 0.5rem;
          height: 1rem;
          width: 0.25rem;
        }

        &.M {
          &:before {
            background-color: #41b6e6;
          }
        }

        &.MP {
          &:before {
            background-color: #004c99;
          }
        }

        &.ME {
          &:before {
            background-color: #00008b;
          }
        }

        &.T {
          &:before {
            background-color: #ec435c;
          }
        }

        &.TP {
          &:before {
            background-color: #8c0c1f;
          }
        }

        &.TO {
          &:before {
            background-color: #44050e;
          }
        }

        &.V {
          &:before {
            background-color: #ff8a00;
          }
        }

        &.N {
          &:before {
            background-color: #03212d;
          }
        }

        &.F {
          &:before {
            background-color: #198038;
          }
        }

        &.BH {
          &:before {
            background-color: #a3a3a3;
          }
        }

        .rbc-event-content {
          color: ${props.theme.colors.neutral.low.pure};
        }

        &.selected {
          .rbc-event-content {
            color: ${props.theme.colors.neutral.high.pure};
          }
        }
      }
    }
  `}
`
