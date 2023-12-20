import { useEffect, useState, useRef } from 'react'

import { v4 } from 'uuid'

import { Icon } from '@/components/Core/Icons/Icon'
import { HelperText } from '@/components/Core/Form/HelperText'
import { Container } from './Input.styles'

interface Props {
  label: string
  name: string
  inputMode?:
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
  type?:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  initialValue?: string
  value?: string
  maxlength?: number
  error?: boolean
  helperText?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function Input({
  label,
  name,
  inputMode,
  type,
  initialValue,
  value,
  maxlength,
  error,
  helperText,
  disabled,
  onChange,
  onBlur
}: Props) {
  const inputField = useRef<HTMLInputElement | null>(null)

  const [inputValue, setInputValue] = useState(initialValue || '')
  const [isShowingPassword, setIsShowingPassword] = useState(false)

  useEffect(() => {
    typeof value === 'string' && setInputValue(value)
  }, [value])

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e)

    setInputValue(e.target.value)
  }

  function handlePasswordIcon() {
    if (inputField.current) {
      if (isShowingPassword) {
        setIsShowingPassword(false)
        inputField.current.type = 'password'
      } else {
        setIsShowingPassword(true)
        inputField.current.type = 'text'
      }
    }
  }

  return (
    <Container hasValue={!!inputValue} error={error} disabled={disabled}>
      <div className="input">
        <input
          id={v4()}
          name={name}
          inputMode={inputMode}
          type={type}
          value={inputValue}
          maxLength={maxlength}
          disabled={disabled}
          onChange={handleOnChange}
          onBlur={onBlur}
          ref={inputField}
          autoComplete="one-time-code"
        />

        <label
          htmlFor={name}
          aria-hidden="true"
          onClick={() => {
            inputField.current?.focus()
          }}
        >
          <span>{label}</span>
        </label>

        {type === 'password' && (
          <div
            className="show-password"
            onClick={handlePasswordIcon}
            aria-hidden="true"
          >
            <Icon
              size="md"
              icon={!isShowingPassword ? 'visibility_on' : 'visibility_off'}
            />
          </div>
        )}
      </div>

      {helperText && <HelperText text={helperText} />}
    </Container>
  )
}

Input.defaultProps = {
  inputMode: 'text',
  type: 'text',
  initialValue: undefined,
  value: undefined,
  maxlength: undefined,
  error: undefined,
  helperText: undefined,
  disabled: undefined,
  onChange: undefined,
  onBlur: undefined
}
