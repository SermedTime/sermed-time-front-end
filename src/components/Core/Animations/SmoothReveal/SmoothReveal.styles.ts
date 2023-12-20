import styled from 'styled-components'

export const Container = styled.div`
  opacity: 0;
  visibility: hidden;
  max-height: 0;

  transition: max-height 150ms ease-out;

  &.visible {
    opacity: 1;
    visibility: visible;
    max-height: 1000px;
  }
`
