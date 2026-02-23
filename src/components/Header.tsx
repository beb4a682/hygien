type HeaderProps = {
  title?: string
  onHome: () => void
  onProfile: () => void
}

function Header({ title = 'Hygiene Level Up', onHome, onProfile }: HeaderProps) {
  return (
    <div className="header headerCandy">
      <div className="headerInner headerInnerCandy">
        <button className="iconBtn iconBtnCandy" onClick={onHome} aria-label="Home">
          <span className="iconGlyph">🏠</span>
        </button>

        <div className="headerCenter">
          <div className="headerTitleRow">
            <div className="headerTitle headerTitleCandy">{title}</div>

            {/* маленькая “конфетка” справа от заголовка */}
            <span className="headerPill">чисто ✨</span>
          </div>

          <div className="headerSub">
            <img
              src="/mascot-pig.png"
              width={22}
              height={22}
              alt=""
              className="headerMascot"
            />
            <span>приятный режим гигиены</span>
          </div>
        </div>

        <button className="iconBtn iconBtnCandy" onClick={onProfile} aria-label="Profile">
          <span className="iconGlyph">👤</span>
        </button>
      </div>
    </div>
  )
}

export default Header