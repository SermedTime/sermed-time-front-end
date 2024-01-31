import { Overview } from './Overview'
import { PageViewContext } from './context/PageView'

export function UserTimeSheet() {
  return (
    <PageViewContext>
      <Overview />
    </PageViewContext>
  )
}
