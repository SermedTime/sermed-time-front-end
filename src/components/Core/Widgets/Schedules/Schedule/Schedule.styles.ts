import styled, { css } from 'styled-components'

interface Props {
  shift_initials: string
}

export const Container = styled.div`
  ${props => css`
    background-color: ${props.theme.colors.neutral.high.medium};
    border-radius: ${props.theme.border.radius.md};
    padding: 1rem;

    display: flex;

    &:hover {
      cursor: pointer;
    }
  `}
`

export const Identifier = styled.div<Props>`
  ${props => css`
    border-radius: ${props.theme.border.radius.pill};
    margin-right: 0.5rem;
    min-height: 1rem;
    min-width: 0.25rem;

    ${props.shift_initials === 'M' &&
    css`
      background-color: #41b6e6;
    `}

    ${props.shift_initials === 'MP' &&
    css`
      background-color: #004c99;
    `}

    ${props.shift_initials === 'ME' &&
    css`
      background-color: #00008b;
    `}

    ${props.shift_initials === 'T' &&
    css`
      background-color: #ec435c;
    `}

    ${props.shift_initials === 'TP' &&
    css`
      background-color: #8c0c1f;
    `}

    ${props.shift_initials === 'TO' &&
    css`
      background-color: #44050e;
    `}

    ${props.shift_initials === 'V' &&
    css`
      background-color: #ff8a00;
    `}

    ${props.shift_initials === 'N' &&
    css`
      background-color: #03212d;
    `}

    ${props.shift_initials === 'F' &&
    css`
      background-color: #198038;
    `}

    ${props.shift_initials === 'BH' &&
    css`
      background-color: #a3a3a3;
    `}
  `}
`
