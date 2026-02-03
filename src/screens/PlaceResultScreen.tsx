type Props = {
  placeTitle: string
  values: Record<string, number>
  onGoHome: () => void
  onMakeMission: () => void
}

const verdictByAvg = (avg: number) => {
  if (avg >= 4) return '🐷 Отлично! Очень чисто.'
  if (avg >= 3) return '🐷 В целом неплохо, есть мелочи.'
  if (avg >= 2) return '🐷 Есть над чем поработать.'
  return '🐷 Стоит обратить внимание на чистоту.'
}

export default function PlaceResultScreen({
  placeTitle,
  values,
  onGoHome,
  onMakeMission,
}: Props) {
  const scores = Object.values(values)
  const avg =
    scores.length === 0
      ? 0
      : scores.reduce((a, b) => a + b, 0) / scores.length

  return (
    <div style={{ padding: 16 }}>
      <h1>Результат наблюдения</h1>

      <p style={{ marginTop: 6, opacity: 0.8 }}>
        Место: <strong>{placeTitle}</strong>
      </p>

      <div
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          {verdictByAvg(avg)}
        </div>

        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Средняя оценка: {avg.toFixed(1)} / 5
        </p>
      </div>

      <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
        <button onClick={onMakeMission}>
          Сделать миссией дня
        </button>

        <button onClick={onGoHome}>
          На главную
        </button>
      </div>
    </div>
  )
}
