import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`ui-card ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <div className={`ui-cardTitle ${className}`}>{children}</div>
}

export function CardText({ children, className = '' }: CardProps) {
  return <div className={`ui-cardText ${className}`}>{children}</div>
}
