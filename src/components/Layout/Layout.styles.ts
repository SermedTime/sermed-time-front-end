import styled from 'styled-components'

interface Container {
  width: string
}

export const Container = styled.div<Container>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  min-height: 100vh;
  width: ${props => props.width};
`

export const Background = styled.div`
  background-image: linear-gradient(321.77deg, #e3e0ff 74.96%, #ffffff 114.96%);
  opacity: 0.48;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 990;

  height: 100vh;
  width: 100%;
`

export const Ellipse = styled.div`
  position: fixed;
  top: 354px;
  left: -491.26px;
  z-index: 991;

  width: 2381.97px;
  height: 1197.86px;

  background: linear-gradient(
    245.29deg,
    #65ff80 13.32%,
    #a1ffbc 28.55%,
    #bfffda 55.55%,
    #c9ffe4 84.12%
  );
  filter: blur(364px);
  transform: rotate(-15deg);
`
