import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { HTMLProps, useRef } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  icon?: string
  accept?: string
  multiple?: boolean
}

export function InputFile({ label, icon, accept, multiple, onChange }: Props) {
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

      <input
        ref={ref}
        type="file"
        className="d-none"
        onChange={onChange}
        accept={accept}
        multiple={multiple}
      />
    </>
  )
}

InputFile.defaultProps = {
  icon: undefined,
  accept: undefined,
  multiple: false
}
