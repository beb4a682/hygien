import type { PropsWithChildren } from 'react'

export function Card({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  const isSoft = className?.includes('soft')
  const isAccent = className?.includes('accent')

  const base: React.CSSProperties = {
    borderRadius: 20,
    padding: 16,
    background: 'var(--card)',
    border: '1px solid rgba(93,169,233,0.16)',
    boxShadow: 'var(--shadowSm)',
  }

  const soft: React.CSSProperties = isSoft
    ? {
        background: 'linear-gradient(180deg, rgba(234,244,255,0.9), rgba(255,255,255,0.92))',
        boxShadow: 'var(--shadow)',
      }
    : {}

  const accent: React.CSSProperties = isAccent
    ? {
        background: 'linear-gradient(180deg, rgba(234,244,255,0.95), rgba(255,255,255,0.92))',
        boxShadow: 'var(--shadow)',
      }
    : {}

  return <section style={{ ...base, ...soft, ...accent, ...style }}>{children}</section>
}

export function CardTitle({ children }: PropsWithChildren) {
  return <div style={{ fontSize: 16, fontWeight: 950, letterSpacing: '-0.02em' }}>{children}</div>
}

export function CardText({ children }: PropsWithChildren) {
  return <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>{children}</div>
}