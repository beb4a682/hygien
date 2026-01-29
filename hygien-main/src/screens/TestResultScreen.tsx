type TestResultScreenProps = {
  score: number
  maxScore: number
  onGoHome: () => void
  onTryAgain: () => void
}

function TestResultScreen({ score, maxScore, onGoHome, onTryAgain }: TestResultScreenProps) {
  const percent = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100)

  const verdict =
    percent >= 85
      ? 'Отличный результат!'
      : percent >= 60
      ? 'Хороший результат!'
      : 'Начало положено!'

  const mascotLine =
    percent >= 85
      ? '🐷 «Ты классно справился! Давай закрепим это каждый день».'
      : percent >= 60
      ? '🐷 «Здорово! Ещё чуть-чуть — и будет супер».'
      : '🐷 «Ничего, мы учимся шаг за шагом. Попробуем снова?»'

  return (
    <div>
      <h1>{verdict}</h1>
      <p style={{ marginTop: 8 }}>Правильных ответов: <strong>{score}</strong> из {maxScore}</p>
      <p style={{ marginTop: 8, opacity: 0.9 }}>{mascotLine}</p>
      <p style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
  Совет: если было сложно — открой лекции и повтори тему про чистые руки.
</p>


      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={onTryAgain}>Пройти ещё раз</button>
        <button onClick={onGoHome}>На главную</button>
      </div>
    </div>
  )
}

export default TestResultScreen