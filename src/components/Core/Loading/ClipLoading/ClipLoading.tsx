import { ClipLoader } from 'react-spinners'
import * as S from './ClipLoading.styles'

export function ClipLoading() {
  return (
    <S.Container>
      <ClipLoader
        size={20}
        color="#292929"
        loading={true}
        speedMultiplier={0.4}
      />
    </S.Container>
  )
}
