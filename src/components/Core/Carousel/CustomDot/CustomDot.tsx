import { DotProps } from 'react-multi-carousel'

export function CustomDot({ onClick, active }: DotProps) {
  return (
    <li
      className={`react-multi-carousel-dot ${active ? 'active' : 'inactive'}`}
    >
      <button type="button" onClick={() => onClick && onClick()}>
        &nbsp;
      </button>
    </li>
  )
}
