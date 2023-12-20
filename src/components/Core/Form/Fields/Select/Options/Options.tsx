import { useEffect, useState } from 'react'

import { IOption } from '../Select.interface'

import { Wrapper, List, Option, Color } from './Options.styles'

interface Props {
  size?: 'sm' | 'lg'
  show: boolean
  value: string | number
  options: IOption[] | undefined | null
  colorMode?: boolean
  onChange: (option: IOption) => void
  onClose: () => void
}

export function Options({
  size,
  show,
  value,
  options,
  colorMode,
  onChange,
  onClose
}: Props) {
  const [visible, setVisible] = useState(false)

  const [selectValue, setSelectValue] = useState<string | number>(value || '')

  useEffect(() => {
    setVisible(show)
  }, [show])

  useEffect(() => {
    if (!options) return

    if (typeof value === 'string' || typeof value === 'number') {
      const selected = options.find(option => option.value === value)

      if (selected) {
        setSelectValue(selected.value)
      } else {
        setSelectValue('')
      }
    }
  }, [value, options])

  function handleOnClick(option: IOption) {
    if (selectValue === option.value) {
      onChange({ value: '', label: '' })
      setSelectValue('')
    } else {
      onChange(option)
      setSelectValue(option.value)
    }

    setVisible(false)
    onClose()
  }

  return (
    <Wrapper size={size} className={`${visible && 'visible'}`}>
      <List>
        {options &&
          options.map(option => (
            <Option
              key={option.value}
              size={size}
              selected={selectValue === option.value}
              onClick={() => {
                handleOnClick(option)
              }}
            >
              {colorMode ? (
                <Color color={String(option.value)} />
              ) : (
                option.label
              )}
            </Option>
          ))}
      </List>
    </Wrapper>
  )
}

Options.defaultProps = {
  size: undefined,
  colorMode: undefined
}
