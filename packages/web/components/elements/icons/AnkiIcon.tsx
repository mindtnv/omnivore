import { IconProps } from '@phosphor-icons/react'

type AnkiIconProps = {
  size?: number
  color?: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}

export function AnkiIcon({
  size = 24,
  color = 'currentColor',
  weight = 'regular',
}: AnkiIconProps): JSX.Element {
  const strokeWidth = weight === 'bold' ? 2 : weight === 'thin' ? 0.5 : 1.5

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back card */}
      <rect
        x="5"
        y="4"
        width="14"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.5"
      />
      {/* Front card */}
      <rect
        x="3"
        y="8"
        width="14"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth={strokeWidth}
        fill={weight === 'fill' ? color : 'none'}
      />
      {/* Star on front card */}
      {weight !== 'fill' && (
        <path
          d="M10 11L10.8 13.4H13.3L11.25 14.9L12.05 17.3L10 15.8L7.95 17.3L8.75 14.9L6.7 13.4H9.2L10 11Z"
          fill={color}
        />
      )}
      {/* Flip arrow */}
      <path
        d="M19 12C19 12 20.5 10.5 22 12C23.5 13.5 22 15 22 15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M21 10.5L22.5 12.5L21 14.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
