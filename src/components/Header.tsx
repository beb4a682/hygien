type HeaderProps = {
  title?: string
  onHome: () => void
  onProfile: () => void
}

function Header({ title = 'Hygiene Level Up', onHome, onProfile }: HeaderProps) {
  return (
    <div className="header">
      <div className="headerInner">
        <button className="iconBtn" onClick={onHome} aria-label="Home">
          🏠
        </button>

        <div className="headerTitle">{title}</div>

        <button className="iconBtn" onClick={onProfile} aria-label="Profile">
          👤
        </button>
      </div>
    </div>
  )
}

export default Header