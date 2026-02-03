type TipBoxProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

export function TipBox({ title = 'Совет', children, className = '' }: TipBoxProps) {
  return (
    <div className={`ui-tip ${className}`}>
      <div className="ui-tipTitle">{title}</div>
      <div className="ui-tipBody">{children}</div>
    </div>
  )
}
