import { ICaptionBullet } from './CaptionBullet/CaptionBullet.interface'

import { CaptionBullet } from './CaptionBullet'

interface Props {
  data: ICaptionBullet[]
}

export function Captions({ data }: Props) {
  if (!data) return null

  return (
    <div className="d-flex gap-4">
      {data.map((caption, idx) => (
        <CaptionBullet key={idx} color={caption.color} label={caption.label} />
      ))}
    </div>
  )
}
