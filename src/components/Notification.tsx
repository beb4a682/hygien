import './notification.css'
type NotificationProps = {
  text: string
  actionLabel?: string
  onAction?: () => void
  onClose: () => void
}

function Notification({ text, actionLabel, onAction, onClose }: NotificationProps) {
  return (
    <div className="notification">
      <div>{text}</div>

      {actionLabel && onAction && (
        <button onClick={onAction}>{actionLabel}</button>
      )}

      <button onClick={onClose} aria-label="close">✕</button>
    </div>
  )
}

export default Notification
