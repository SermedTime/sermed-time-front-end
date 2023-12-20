import { HTMLProps, useRef } from 'react'

import { ButtonLink } from 'components/Core/Buttons/ButtonLink'

interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  icon?: string
}

export function InputFile({ label, icon, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  function handleClick() {
    if (ref && ref.current) {
      ref.current.value = ''
      ref.current.click()
    }
  }

  return (
    <>
      {!icon ? (
        <ButtonLink onClick={() => handleClick()}>{label}</ButtonLink>
      ) : (
        <ButtonLink onClick={() => handleClick()} icon={icon}>
          {label}
        </ButtonLink>
      )}

      <input ref={ref} type="file" className="d-none" onChange={onChange} />
    </>
  )
}

InputFile.defaultProps = {
  icon: undefined
}
