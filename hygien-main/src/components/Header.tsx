type HeaderProps = {
  title?: string
  onHome: () => void
  onProfile: () => void
}

function Header({ title = 'Hygiene Level Up', onHome, onProfile }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
      <button onClick={onHome} aria-label="Home">🏠</button>

      <div style={{ flex: 1, fontWeight: 700 }}>{title}</div>

      <button onClick={onProfile} aria-label="Profile">👤</button>
    </div>
  )
}

export default Header
