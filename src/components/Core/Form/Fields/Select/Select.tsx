import { useRef, useState, useEffect } from 'react'

import { Label } from '@/components/Core/Form/Label'
import { Icon } from '@/components/Core/Icons/Icon'
import { HelperText } from '@/components/Core/Form/HelperText'

import { Options } from './Options'
import { Color } from './Options/Options.styles'

import { IOption } from './Select.interface'
import { Container } from './Select.styles'

interface Props {
  size?: 'sm' | 'lg'
  label?: string
  name?: string
  placeholder?: string
  options: IOption[] | undefined | null
  initialValue?: string | number
  value?: string | number
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  colorMode?: boolean
  onChange?: (option: IOption) => void
  onReset?: () => void
}

export function Select({
  size,
  label,
  name,
  placeholder,
  options,
  initialValue,
  value,
  error,
  helperText,
  readOnly,
  disabled,
  colorMode,
  onChange,
  onReset
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchField = useRef<HTMLInputElement | null>(null)

  const [selectValue, setSelectValue] = useState<string | number>(
    initialValue || ''
  )
  const [selectLabel, setSelectLabel] = useState('')

  const [filter, setFilter] = useState('')

  const [isShowingOptions, setIsShowingOptions] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowingOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (!isShowingOptions) {
      setFilter('')
      return
    }

    searchField.current?.focus()
  }, [isShowingOptions])

  useEffect(() => {
    if (
      (typeof initialValue === 'string' || typeof initialValue === 'number') &&
      options
    ) {
      const selected = options.find(option => option.value === initialValue)

      if (selected) {
        setSelectValue(selected.value)
        setSelectLabel(selected.label)
      }
    }
  }, [initialValue, options])

  useEffect(() => {
    if ((typeof value === 'string' || typeof value === 'number') && options) {
      const selected = options.find(option => option.value === value)

      if (selected) {
        setSelectValue(selected.value)
        setSelectLabel(selected.label)
      } else {
        setSelectValue('')
        setSelectLabel('')
      }
    } else {
      setSelectValue('')
      setSelectLabel('')
    }
  }, [value, options])

  function handleOnReset() {
    setSelectValue('')
    setSelectLabel('')

    setIsShowingOptions(false)

    onReset && onReset()
  }

  function handleIcon() {
    if (readOnly || disabled) {
      return (
        <div className="expand" style={{ cursor: 'no-drop' }}>
          <Icon
            size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
            icon="expand_more"
          />
        </div>
      )
    }

    if (selectValue && !isShowingOptions && onReset) {
      return (
        <div className="reset" onClick={handleOnReset} aria-hidden="true">
          <Icon size={`${!size || size === 'lg' ? 'md' : 'sm'}`} icon="close" />
        </div>
      )
    }

    if (isShowingOptions) {
      return (
        <div className="search">
          <Icon
            size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
            icon="search"
          />
        </div>
      )
    }

    return (
      <div className="expand" aria-hidden="true">
        <Icon
          size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
          icon={`${isShowingOptions ? 'expand_less' : 'expand_more'}`}
        />
      </div>
    )
  }

  return (
    <Container
      ref={wrapperRef}
      size={size}
      error={error}
      readOnly={readOnly}
      disabled={disabled}
    >
      {label && (
        <Label htmlFor={name} size={size}>
          {label}
        </Label>
      )}

      <div
        className={`select search
          ${isShowingOptions ? 'open' : ''}
        `}
        onClick={() => {
          if (!readOnly && !disabled) {
            setIsShowingOptions(isShowing => !isShowing)
          }
        }}
        aria-hidden="true"
      >
        {isShowingOptions ? (
          <span>
            <input
              ref={searchField}
              value={filter}
              placeholder={!isShowingOptions ? selectLabel || placeholder : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target

                setFilter(value)
              }}
            />
          </span>
        ) : colorMode ? (
          <Color color={String(selectValue)} />
        ) : (
          <span className={`${selectLabel ? 'has-value' : ''}`}>
            {options ? selectLabel || placeholder : 'Aguarde...'}
          </span>
        )}

        <div className="icon">{handleIcon()}</div>
      </div>

      <Options
        size={size}
        show={isShowingOptions}
        value={selectValue}
        options={
          !filter
            ? options
            : options?.filter(function (option) {
                return option.label
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .includes(
                    filter
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                  )
              })
        }
        colorMode={colorMode}
        onChange={option => {
          setSelectValue(option.value)
          setSelectLabel(option.label)

          setFilter('')

          onChange && onChange(option)
        }}
        onClose={() => setIsShowingOptions(false)}
      />

      {helperText && <HelperText text={helperText} />}
    </Container>
  )
}

Select.defaultProps = {
  size: undefined,
  label: undefined,
  name: undefined,
  placeholder: undefined,
  initialValue: undefined,
  value: undefined,
  error: undefined,
  helperText: undefined,
  readOnly: undefined,
  disabled: undefined,
  colorMode: undefined,
  onChange: undefined,
  onReset: undefined
}
