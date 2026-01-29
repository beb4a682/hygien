type LectureDoneScreenProps = {
  title: string
  onGoHome: () => void
  onBackToLectures: () => void
  onGoTest: () => void
}

function LectureDoneScreen({
  title,
  onGoHome,
  onBackToLectures,
  onGoTest,
}: LectureDoneScreenProps) {
  return (
    <div>
      <h1>Готово ✅</h1>

      <p style={{ marginTop: 8, opacity: 0.9 }}>
        Ты закончил лекцию: <strong>{title}</strong>
      </p>

      <p style={{ marginTop: 8, opacity: 0.85 }}>
        Можно закрепить знания — пройти мини-тест по этой теме.
      </p>

      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        <button onClick={onGoTest}>Проверить себя</button>
        <button onClick={onBackToLectures}>К списку лекций</button>
        <button onClick={onGoHome}>На главную</button>
      </div>
    </div>
  )
}

export default LectureDoneScreen
