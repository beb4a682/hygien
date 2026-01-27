type LectureDoneScreenProps = {
  title: string
  onGoHome: () => void
  onBackToLectures: () => void
}

function LectureDoneScreen({ title, onGoHome, onBackToLectures }: LectureDoneScreenProps) {
  return (
    <div>
      <h1>Отлично! ✅</h1>

      <p style={{ marginTop: 8 }}>
        Ты прошёл лекцию: <strong>{title}</strong>
      </p>

      <p style={{ marginTop: 12, opacity: 0.9 }}>
        🐷 «Красавчик! Главное — не геройствовать, а делать маленькие шаги каждый день».
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={onGoHome}>На главную</button>
        <button onClick={onBackToLectures}>К списку лекций</button>
      </div>
    </div>
  )
}

export default LectureDoneScreen
