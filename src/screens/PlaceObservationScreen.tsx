import { useMemo, useState } from 'react'

type Criterion = {
  id: string
  text: string
  help: string
  weight: 1 | 2 | 3 // оставляем, но больше не показываем пользователю
}

type PlaceObservationScreenProps = {
  placeTitle: string
  criteria: Criterion[]
  onSubmit: (score: number, maxScore: number) => void
  onBack: () => void
}

const SCALE = [
  { value: 1, label: 'Очень плохо' },
  { value: 2, label: 'Плохо' },
  { value: 3, label: 'Норм' },
  { value: 4, label: 'Хорошо' },
  { value: 5, label: 'Отлично' },
] as const

type ScaleValue = (typeof SCALE)[number]['value']

function PlaceObservationScreen({
  placeTitle,
  criteria,
  onSubmit,
  onBack,
}: PlaceObservationScreenProps) {
  // выбранные оценки: { criterionId: 1..5 }
  const [ratings, setRatings] = useState<Record<string, ScaleValue | undefined>>({})

  // maxScore: максимум возможных очков (внутренне)
  // тут вес учитываем: вес * 5
  const maxScore = useMemo(() => {
    return criteria.reduce((sum, c) => sum + c.weight * 5, 0)
  }, [criteria])

  // score: сумма (оценка 1..5) * вес
  const score = useMemo(() => {
    return criteria.reduce((sum, c) => {
      const r = ratings[c.id]
      if (!r) return sum
      return sum + r * c.weight
    }, 0)
  }, [criteria, ratings])

  // все ли критерии оценены
  const allRated = useMemo(() => {
    return criteria.every((c) => Boolean(ratings[c.id]))
  }, [criteria, ratings])

  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>Наблюдение: {placeTitle}</h1>
      <p style={{ opacity: 0.9 }}>
        Оцени каждый пункт по шкале. Это поможет понять, насколько место чистое.
      </p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {criteria.map((c) => {
          const picked = ratings[c.id]
          return (
            <div
              key={c.id}
              style={{
                padding: 12,
                borderRadius: 14,
                background: '#f5f5f5',
                display: 'grid',
                gap: 8,
              }}
            >
              <div style={{ fontWeight: 700 }}>{c.text}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{c.help}</div>

              {/* Шкала */}
              <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {SCALE.map((s) => {
                    const active = picked === s.value
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() =>
                          setRatings((prev) => ({ ...prev, [c.id]: s.value }))
                        }
                        style={{
                          padding: '8px 10px',
                          borderRadius: 12,
                          border: '1px solid #ddd',
                          background: active ? '#e9e9e9' : '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        {s.value}
                      </button>
                    )
                  })}
                </div>

                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {picked ? (
                    <>
                      Выбрано: <strong>{SCALE.find((x) => x.value === picked)?.label}</strong>
                    </>
                  ) : (
                    'Выбери оценку от 1 до 5'
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => onSubmit(score, maxScore)}
          disabled={!allRated}
          style={{ marginTop: 10 }}
        >
          Готово ✅
        </button>

        {!allRated && (
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            Нужно оценить все пункты, чтобы получить результат.
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaceObservationScreen
