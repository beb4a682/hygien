import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', style, disabled, ...props }: Props) {
  const base: React.CSSProperties = {
    height: 44,
    padding: '0 14px',
    borderRadius: 16,
    fontWeight: 900,
    letterSpacing: '-0.01em',
    border: '1px solid rgba(93,169,233,0.18)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
  }

  const variants: Record<Variant, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(180deg, #6EB6FF, #5DA9E9)',
      color: '#fff',
      boxShadow: '0 10px 22px rgba(93,169,233,0.18)',
    },
    secondary: {
      background: 'rgba(234,244,255,0.92)',
      color: 'var(--text)',
      boxShadow: 'var(--shadowSm)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      boxShadow: 'none',
    },
  }

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...base,
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => {
        if (disabled) return
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)'
        props.onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        props.onMouseUp?.(e)
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        props.onMouseLeave?.(e)
      }}
    />
  )
}