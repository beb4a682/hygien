import { useMemo, useState } from 'react'

type Criterion = {
  id: string
  text: string
  help: string
  weight: 1 | 2 | 3
}

type PlaceObservationScreenProps = {
  placeTitle: string
  criteria: Criterion[]
  onSubmit: (score: number, maxScore: number) => void
  onBack: () => void
}

function PlaceObservationScreen({
  placeTitle,
  criteria,
  onSubmit,
  onBack,
}: PlaceObservationScreenProps) {
  const maxScore = useMemo(
    () => criteria.reduce((sum, c) => sum + c.weight, 0),
    [criteria],
  )

  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const score = useMemo(() => {
    return criteria.reduce((sum, c) => sum + (checked[c.id] ? c.weight : 0), 0)
  }, [criteria, checked])

  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>Наблюдение: {placeTitle}</h1>
      <p>Отметь, что в порядке. Чем важнее пункт — тем больше вес.</p>

      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        {criteria.map((c) => (
          <label
            key={c.id}
            style={{
              display: 'grid',
              gap: 4,
              padding: 12,
              borderRadius: 12,
              background: '#f5f5f5',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={Boolean(checked[c.id])}
                  onChange={(e) =>
                    setChecked((prev) => ({ ...prev, [c.id]: e.target.checked }))
                  }
                  style={{ marginRight: 8 }}
                />
                {c.text}
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>вес: {c.weight}</div>
            </div>

            <div style={{ fontSize: 12, opacity: 0.85 }}>{c.help}</div>
          </label>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Текущий результат: {score} / {maxScore}
        </div>

        <button
          onClick={() => onSubmit(score, maxScore)}
          style={{ marginTop: 10 }}
        >
          Готово ✅
        </button>
      </div>
    </div>
  )
}

export default PlaceObservationScreen
