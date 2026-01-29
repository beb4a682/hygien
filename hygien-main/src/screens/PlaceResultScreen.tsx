type PlaceResultScreenProps = {
  placeTitle: string
  score: number
  maxScore: number
  onGoHome: () => void
  onTryAgain: () => void
}

function PlaceResultScreen({
  placeTitle,
  score,
  maxScore,
  onGoHome,
  onTryAgain,
}: PlaceResultScreenProps) {
  const percent = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100)

  const verdict =
    percent >= 85
      ? 'Отлично!'
      : percent >= 60
      ? 'Неплохо!'
      : 'Есть что улучшить!'

  const mascotLine =
    percent >= 85
      ? '🐷 «Чистюля detected. Так держать!»'
      : percent >= 60
      ? '🐷 «Нормально! Чуть-чуть подкрутить — и будет супер».'
      : '🐷 «Окей. Маленький шаг — и уже лучше. Начнём с одного пункта!»'

  return (
    <div>
      <h1>{verdict}</h1>
      <p style={{ marginTop: 8 }}>
        Место: <strong>{placeTitle}</strong>
      </p>

      <div style={{ marginTop: 12 }}>
        Результат: <strong>{score}</strong> / {maxScore} ({percent}%)
      </div>

      <p style={{ marginTop: 12, opacity: 0.9 }}>{mascotLine}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={onTryAgain}>Повторить</button>
        <button onClick={onGoHome}>На главную</button>
      </div>
    </div>
  )
}

export default PlaceResultScreen
