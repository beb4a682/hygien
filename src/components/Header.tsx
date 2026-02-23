type Props = {
  title: string
  onHome: () => void
  onProfile: () => void
}

export default function Header({ title, onHome, onProfile }: Props) {
  return (
    <header className="appHeader">
      {/* LEFT */}
      <button
        className="headerBtn"
        onClick={onHome}
        aria-label="Главная"
      >
        🏠
      </button>

      {/* CENTER */}
      <div className="headerTitle">{title}</div>

      {/* RIGHT */}
      <button
        className="headerBtn"
        onClick={onProfile}
        aria-label="Профиль"
      >
        👤
      </button>
    </header>
  )
}