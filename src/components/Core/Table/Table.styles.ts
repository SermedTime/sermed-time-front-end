import styled, { css } from 'styled-components'

import { rgba } from 'polished'

interface Props {
  isLoading?: boolean
  responsive?: boolean
  scrollable?: boolean
  bordered?: boolean
  hover?: boolean
}

export const Wrapper = styled.div<Props>`
  ${props => css`
    border-color: transparent;
    border-radius: ${props.theme.border.radius.md};
    border-style: solid;
    border-width: ${props.theme.border.width.hairline};
    padding: 0 0.5rem;

    ${props.responsive &&
    css`
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 0.5rem;
        width: ${props.theme.spacing.nano};
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: ${props.theme.border.radius.sm};
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${props.theme.colors.neutral.low.medium};
        border-radius: ${props.theme.border.radius.sm};
        transition: background-color 250ms ease;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: ${props.theme.colors.neutral.low.dark};
      }
    `}

    ${props.bordered &&
    css`
      border-color: ${rgba(
        props.theme.colors.neutral.low.pure,
        props.theme.opacity.level.medium
      )};
    `}
  `}
`

export const Scrollable = styled.div`
  ${props => css`
    overflow-y: auto;
    max-height: 337px;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: ${props.theme.border.radius.sm};
      margin: 1.35rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${rgba(
        props.theme.colors.neutral.low.dark,
        props.theme.opacity.level.intense
      )};
      border-radius: ${props.theme.border.radius.sm};
    }
  `}
`

export const Container = styled.table<Props>`
  ${props => css`
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    width: 100%;

    tr {
      height: 3.5rem;
    }

    th {
      padding: 0.25rem 0.75rem;

      &:first-child {
        padding-left: 1rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
    }

    td {
      padding: 0.25rem 0.75rem;
      vertical-align: middle;

      &:first-child {
        padding-left: 1rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
    }

    tbody {
      tr {
        background-color: transparent;

        td:first-child {
          border-top-left-radius: ${props.theme.border.radius.sm};
          border-bottom-left-radius: ${props.theme.border.radius.sm};
        }

        td:last-child {
          border-top-right-radius: ${props.theme.border.radius.sm};
          border-bottom-right-radius: ${props.theme.border.radius.sm};
        }

        td {
          border: 1px solid transparent;

          transition: border-color 250ms;

          > div.show-on-hover {
            opacity: 0;
            visibility: hidden;

            transition:
              visibility 0s,
              opacity 250ms linear;
          }
        }

        transition: background-color 250ms ease-in;

        ${!props.isLoading &&
        css`
          ${
            props.hover !== false &&
            css`
            &:hover {
            background-color: ${rgba(
              props.theme.colors.neutral.low.pure,
              props.theme.opacity.level.semitransparent
            )};
          `
          }

            td {
              > div.show-on-hover {
                opacity: 1;
                visibility: visible;
              }
            }
          }
        `}

        transition: background-color 250ms ease;

        &.highlight-success {
          background-color: ${rgba(
            props.theme.colors.feedback.success.light,
            props.theme.opacity.level.light
          )};

          td {
            border-top-color: ${props.theme.colors.feedback.success.pure};
            border-bottom-color: ${props.theme.colors.feedback.success.pure};
          }

          td:first-child {
            border-left-color: ${props.theme.colors.feedback.success.pure};
          }

          td:last-child {
            border-right-color: ${props.theme.colors.feedback.success.pure};
          }
        }

        &.highlight-warning {
          background-color: ${rgba(
            props.theme.colors.feedback.warning.light,
            props.theme.opacity.level.light
          )};

          td {
            border-top-color: ${props.theme.colors.feedback.warning.pure};
            border-bottom-color: ${props.theme.colors.feedback.warning.pure};
          }

          td:first-child {
            border-left-color: ${props.theme.colors.feedback.warning.pure};
          }

          td:last-child {
            border-right-color: ${props.theme.colors.feedback.warning.pure};
          }
        }

        &.stroke-warning {
          td {
            border-top-color: ${props.theme.colors.feedback.warning.pure};
            border-bottom-color: ${props.theme.colors.feedback.warning.pure};
          }

          td:first-child {
            border-left-color: ${props.theme.colors.feedback.warning.pure};
          }

          td:last-child {
            border-right-color: ${props.theme.colors.feedback.warning.pure};
          }
        }

        &.expandable {
          cursor: pointer;

          .hidden {
            display: none;
          }

          &.show {
            background-color: ${rgba(
              props.theme.colors.neutral.low.pure,
              props.theme.opacity.level.semitransparent
            )};

            .hidden {
              display: block;
            }
          }
        }

        &.no-hover {
          cursor: default !important;
        }
      }
    }

    tfoot {
      tr {
        background-color: ${props.theme.colors.brand.secondary.pure};

        td:first-child {
          border-top-left-radius: ${props.theme.border.radius.sm};
          border-bottom-left-radius: ${props.theme.border.radius.sm};
        }

        td:last-child {
          border-top-right-radius: ${props.theme.border.radius.sm};
          border-bottom-right-radius: ${props.theme.border.radius.sm};
        }
      }

      &.size-md {
        tr {
          height: 3.5rem;
        }
      }

      &.size-lg {
        tr {
          height: 5rem;
        }
      }
    }

    ${props.scrollable &&
    css`
      border-collapse: collapse;
      width: 100%;

      thead {
        tr {
          th {
            position: sticky;
            top: 0;
            z-index: 999;

            div {
              color: ${props.theme.colors.neutral.high.pure};
            }
          }

          th:first-child {
            border-top-left-radius: ${props.theme.border.radius.sm};
            border-bottom-left-radius: ${props.theme.border.radius.sm};
          }

          th:last-child {
            border-top-right-radius: ${props.theme.border.radius.sm};
            border-bottom-right-radius: ${props.theme.border.radius.sm};
          }
        }
      }

      tfoot td {
        position: sticky;
        bottom: 0;
        z-index: 999;
      }

      th {
        background-color: ${props.theme.colors.brand.secondary.pure};
      }
    `}
  `}
`
