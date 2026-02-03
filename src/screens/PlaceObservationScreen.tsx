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
  onSubmit: (values: Record<string, number>, score: number, maxScore: number) => void
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
  const [ratings, setRatings] = useState<Record<string, ScaleValue>>({})
  const [step, setStep] = useState(0)

  const current = criteria[step]
  const currentPicked = current ? ratings[current.id] : undefined
  const isLast = step === criteria.length - 1

  // maxScore: максимум возможных очков (внутренне) с учетом веса
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

  const progress = `${Math.min(step + 1, criteria.length)} / ${criteria.length}`

  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>Наблюдение: {placeTitle}</h1>
      <p style={{ opacity: 0.9 }}>
        Оцени каждый пункт по шкале. Это поможет понять, насколько место чистое.
      </p>

      <div style={{ marginTop: 16 }}>
        {!current ? (
          <div style={{ opacity: 0.8 }}>Критериев нет.</div>
        ) : (
          <div
            style={{
              padding: 12,
              borderRadius: 14,
              background: '#f5f5f5',
              display: 'grid',
              gap: 8,
            }}
          >
            <div style={{ fontWeight: 700 }}>{current.text}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{current.help}</div>

            {/* Ползунок 1..5 */}
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={currentPicked ?? 3}
              onChange={(e) =>
                setRatings((prev) => ({
                  ...prev,
                  [current.id]: Number(e.target.value) as ScaleValue,
                }))
              }
              style={{ width: '100%' }}
            />

            <div style={{ fontSize: 12, opacity: 0.8 }}>
              {currentPicked ? (
                <>
                  Выбрано:{' '}
                  <strong>
                    {SCALE.find((x) => x.value === currentPicked)?.label}
                  </strong>
                </>
              ) : (
                'Передвинь ползунок и выбери оценку'
              )}
            </div>

            {/* Кнопки шагов */}
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                ← Назад
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(criteria.length - 1, s + 1))}
                  disabled={!currentPicked}
                  style={{ marginLeft: 'auto' }}
                >
                  Далее →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSubmit(ratings, score, maxScore)}
                  disabled={!allRated}
                  style={{ marginLeft: 'auto' }}
                >
                  Готово ✅
                </button>
              )}
            </div>

            <div style={{ fontSize: 12, opacity: 0.7 }}>{progress}</div>

            {isLast && !allRated && (
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                Нужно оценить все пункты, чтобы получить результат.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaceObservationScreen
