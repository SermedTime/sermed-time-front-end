import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${props => css`
    border-radius: ${props.theme.border.radius.md};

    position: relative;
  `}
`

export const Header = styled.div`
  ${props => css`
    background: linear-gradient(
      47.38deg,
      ${props.theme.colors.brand.primary.dark} -20%,
      ${props.theme.colors.brand.primary.light} 120%
    );
    border-radius: ${props.theme.border.radius.md}
      ${props.theme.border.radius.md} 0 0;

    height: 6.25rem;
    width: 100%;

    position: absolute;
    top: 0;
  `}
`

export const LastAccess = styled.div`
  ${props => css`
    display: flex;
    align-items: center;
    justify-content: end;

    position: relative;
    right: 2rem;
    bottom: 2rem;

    > div {
      color: ${props.theme.colors.neutral.high.pure};
    }
  `}
`

export const Avatar = styled.div`
  position: relative;
  left: 3.5rem;
  bottom: -2.5rem;
`

export const Body = styled.div`
  margin-top: 6.25rem;
`
