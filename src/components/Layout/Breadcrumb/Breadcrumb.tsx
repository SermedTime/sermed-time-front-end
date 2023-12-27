import { Link } from 'react-router-dom'

import { v4 } from 'uuid'

import { Caption } from '@/components/Core/Typography/Caption'

import { IBreadcrumb } from './Breadcrumb.interface'

import * as S from './Breadcrumb.styles'

interface Props {
  items: IBreadcrumb[]
}

export function Breadcrumb({ items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <S.Container>
      {items.map((item, idx) => (
        <S.Wrapper key={v4()}>
          {idx + 1 === items.length ? (
            <>
              <S.Separator />

              <Caption size="lg">{item.text}</Caption>
            </>
          ) : (
            <>
              {idx > 0 && <S.Separator />}

              {item.route ? (
                <Link to={String(item.route)}>
                  <Caption size="lg">{item.text}</Caption>
                </Link>
              ) : (
                <Caption size="lg">{item.text}</Caption>
              )}
            </>
          )}
        </S.Wrapper>
      ))}
    </S.Container>
  )
}
