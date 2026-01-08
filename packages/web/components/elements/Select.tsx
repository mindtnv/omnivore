import React, { useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown, Check } from '@phosphor-icons/react'
import { styled } from '../tokens/stitches.config'

const SelectTrigger = styled(SelectPrimitive.Trigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '5px',
  padding: '8px 12px',
  fontSize: '16px',
  lineHeight: 1,
  gap: '8px',
  backgroundColor: '$grayBg',
  color: '$grayTextContrast',
  border: '1px solid $grayBorder',
  cursor: 'pointer',
  minWidth: '200px',

  '&:hover': {
    backgroundColor: '$grayBgHover'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$omnivoreCtaYellow'
  },

  '&[data-placeholder]': {
    color: '$grayText'
  }
})

const MultiSelectTrigger = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '5px',
  padding: '8px 12px',
  fontSize: '16px',
  lineHeight: 1,
  gap: '8px',
  backgroundColor: '$grayBg',
  color: '$grayTextContrast',
  border: '1px solid $grayBorder',
  cursor: 'pointer',
  minWidth: '200px',

  '&:hover': {
    backgroundColor: '$grayBgHover'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$omnivoreCtaYellow'
  }
})

const MultiSelectValueContainer = styled('div', {
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  flex: 1
})

const MultiSelectTag = styled('span', {
  backgroundColor: '$grayBgActive',
  color: '$grayTextContrast',
  padding: '2px 8px',
  borderRadius: '3px',
  fontSize: '14px',
  display: 'inline-flex',
  alignItems: 'center'
})

const SelectIcon = styled(SelectPrimitive.Icon, {
  color: '$grayText'
})

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$grayBg',
  borderRadius: '6px',
  boxShadow: '$cardBoxShadow',
  border: '1px solid $grayBorder',
  zIndex: 100
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: '4px'
})

const SelectItem = styled(SelectPrimitive.Item, {
  all: 'unset',
  fontSize: '15px',
  lineHeight: 1,
  color: '$grayTextContrast',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  padding: '0 32px 0 12px',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    color: '$grayText',
    pointerEvents: 'none'
  },

  '&[data-highlighted]': {
    backgroundColor: '$grayBgHover',
    color: '$grayTextContrast'
  }
})

const MultiSelectItem = styled('div', {
  all: 'unset',
  fontSize: '15px',
  lineHeight: 1,
  color: '$grayTextContrast',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  padding: '0 12px 0 12px',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  gap: '8px',

  '&[data-disabled="true"]': {
    color: '$grayText',
    pointerEvents: 'none'
  },

  '&:hover': {
    backgroundColor: '$grayBgHover',
    color: '$grayTextContrast'
  }
})

const MultiSelectCheckbox = styled('div', {
  width: '16px',
  height: '16px',
  border: '1px solid $grayBorder',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,

  variants: {
    checked: {
      true: {
        backgroundColor: '$ctaBlue',
        borderColor: '$ctaBlue'
      }
    }
  }
})

const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  right: '8px',
  width: '16px',
  height: '16px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  backgroundColor: '$grayBg',
  color: '$grayText',
  cursor: 'default'
})

const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  backgroundColor: '$grayBg',
  color: '$grayText',
  cursor: 'default'
})

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  name?: string
  multiple?: boolean
}

export const Select = ({
  value,
  onValueChange,
  placeholder = 'Select an option',
  options,
  disabled = false,
  name,
  multiple = false
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (multiple) {
    const selectedValues = Array.isArray(value) ? value : []

    const handleToggleOption = (optionValue: string) => {
      if (!onValueChange) return

      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue]

      onValueChange(newValues)
    }

    const getSelectedLabels = () => {
      return options
        .filter((opt) => selectedValues.includes(opt.value))
        .map((opt) => opt.label)
    }

    const selectedLabels = getSelectedLabels()

    return (
      <div style={{ position: 'relative' }}>
        <MultiSelectTrigger
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <MultiSelectValueContainer>
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, index) => (
                <MultiSelectTag key={index}>{label}</MultiSelectTag>
              ))
            ) : (
              <span style={{ color: 'var(--colors-grayText)' }}>{placeholder}</span>
            )}
          </MultiSelectValueContainer>
          <CaretDown size={16} style={{ color: 'var(--colors-grayText)' }} />
        </MultiSelectTrigger>

        {isOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99
            }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (
          <SelectContent
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              width: '100%',
              zIndex: 100
            }}
          >
            <SelectViewport>
              {options.map((option) => (
                <MultiSelectItem
                  key={option.value}
                  data-disabled={option.disabled}
                  onClick={() => !option.disabled && handleToggleOption(option.value)}
                >
                  <MultiSelectCheckbox checked={selectedValues.includes(option.value)}>
                    {selectedValues.includes(option.value) && (
                      <Check size={12} color="white" />
                    )}
                  </MultiSelectCheckbox>
                  {option.label}
                </MultiSelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        )}
      </div>
    )
  }

  // Single-select mode (unchanged behavior)
  return (
    <SelectPrimitive.Root
      value={Array.isArray(value) ? value[0] : value}
      onValueChange={(val) => onValueChange && onValueChange(val)}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectIcon>
          <CaretDown size={16} />
        </SelectIcon>
      </SelectTrigger>

      <SelectPrimitive.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <CaretDown size={12} style={{ transform: 'rotate(180deg)' }} />
          </SelectScrollUpButton>
          <SelectViewport>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectItemIndicator>
                  <Check size={16} />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
          <SelectScrollDownButton>
            <CaretDown size={12} />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
