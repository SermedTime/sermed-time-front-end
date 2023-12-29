import { ReactNode, useEffect, useState, useRef } from 'react'

import { v4 } from 'uuid'

import { Label } from '@/components/Core/Form/Label'
import { Icon } from '@/components/Core/Icons/Icon'
import { HelperText } from '@/components/Core/Form/HelperText'

import { Container } from './InputText.styles'

interface Props {
  size?: 'sm' | 'lg'
  label?: string
  tooltip?: string
  name: string
  placeholder?: string
  addonText?: string | number | ReactNode
  addonPlacement?: 'left' | 'right'
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
  maxLength?: number
  suffix?: string
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  step?: string
  min?: string
  max?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function InputText({
  size,
  label,
  tooltip,
  name,
  placeholder,
  addonText,
  addonPlacement,
  inputMode,
  type,
  initialValue,
  value,
  maxLength,
  suffix,
  error,
  helperText,
  readOnly,
  disabled,
  step,
  min,
  max,
  onChange,
  onBlur
}: Props) {
  const inputField = useRef<HTMLInputElement | null>(null)

  const [inputValue, setInputValue] = useState(initialValue || '')

  const [isShowingPassword, setIsShowingPassword] = useState(false)

  useEffect(() => {
    if (typeof value === 'string' || typeof value === 'number') {
      setInputValue(value)
    }
  }, [value])

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (inputMode === 'numeric') {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    setInputValue(e.target.value)

    onChange && onChange(e)
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
    <Container
      size={size}
      addonPlacement={addonText ? addonPlacement || 'left' : undefined}
      hasValue={!!inputValue}
      error={error}
      readOnly={readOnly}
      disabled={disabled}
    >
      {label && (
        <Label htmlFor={name} tooltip={tooltip}>
          {label}
        </Label>
      )}

      <div className="input">
        {addonText && <div className="addon">{addonText}</div>}

        <input
          ref={inputField}
          id={v4()}
          name={name}
          inputMode={inputMode}
          type={type}
          value={
            suffix && inputValue.length > 0
              ? `${inputValue}${suffix}`
              : inputValue
          }
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={readOnly}
          disabled={disabled}
          step={step}
          min={min}
          max={max}
          autoComplete="new-password"
          onChange={handleOnChange}
          onBlur={onBlur}
        />

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

InputText.defaultProps = {
  size: undefined,
  label: undefined,
  tooltip: undefined,
  inputMode: 'text',
  type: 'text',
  initialValue: undefined,
  value: undefined,
  placeholder: undefined,
  addonText: undefined,
  addonPlacement: undefined,
  maxLength: undefined,
  suffix: undefined,
  error: undefined,
  helperText: undefined,
  readOnly: undefined,
  disabled: undefined,
  step: undefined,
  min: undefined,
  max: undefined,
  onChange: undefined,
  onBlur: undefined
}
