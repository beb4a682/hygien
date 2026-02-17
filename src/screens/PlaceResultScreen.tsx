import { PLACE_CRITERIA, type Criterion } from '../data/placeCriteria'
import {
  getWeakCriterionIds,
  pickMissionsForWeakCriteria,
} from '../utils/pickObservationMissions'
import type { PlaceId } from '../data/observationMissions'

type Props = {
  placeId: PlaceId
  placeTitle: string
  values: Record<string, number>
  onAddMissions: (missionIds: string[]) => void
  onBack: () => void
}

function calcScore(criteria: Criterion[], values: Record<string, number>) {
  let score = 0
  let max = 0
  for (const c of criteria) {
    const v = values[c.id] ?? 0 // 0..4 (если у тебя иначе — скажи)
    score += v * c.weight
    max += 4 * c.weight
  }
  return { score, max }
}

function pct(score: number, max: number) {
  if (max <= 0) return 0
  return Math.round((score / max) * 100)
}

function levelTitle(p: number) {
  if (p >= 85) return 'Отлично'
  if (p >= 65) return 'Хорошо'
  if (p >= 45) return 'Нормально'
  if (p >= 25) return 'Плохо'
  return 'Очень плохо'
}

export default function PlaceResultScreen({
  placeId,
  placeTitle,
  values,
  onAddMissions,
  onBack,
}: Props) {
  const criteria = PLACE_CRITERIA[placeId] ?? []

  // считаем слабые пункты "внутри", но НЕ показываем их
  const weakIds = getWeakCriterionIds(placeId, criteria, values, 2)
  const missions = pickMissionsForWeakCriteria(placeId, weakIds, 2)

  const { score, max } = calcScore(criteria, values)
  const percent = pct(score, max)
  const label = levelTitle(percent)

  return (
    <div style={{ padding: 16 }}>
      <h1>Результат наблюдения</h1>

      <p style={{ marginTop: 6, opacity: 0.8 }}>
        Место: <strong>{placeTitle}</strong>
      </p>

      {/* Коротко и без "слабых пунктов" */}
      <div
        style={{
          marginTop: 12,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          padding: 12,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.8 }}>Общий результат</div>
        <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800 }}>
          {label} — {percent}%
        </div>
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
          Чем выше процент — тем чище и безопаснее место.
        </div>
      </div>

      {/* Мини-миссии снизу — выделенный блок */}
      {missions.length > 0 && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.18)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Мини-миссии</h2>
            <span style={{ fontSize: 12, opacity: 0.75 }}>совет</span>
          </div>

          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Хочешь улучшить место? Сделай пару маленьких шагов 👇
          </p>

          <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
            {missions.map((m) => (
              <div
                key={m.id}
                style={{
                  borderRadius: 14,
                  padding: 12,
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: 'rgba(0,0,0,0.12)',
                }}
              >
                <div style={{ fontWeight: 800 }}>{m.title}</div>
                <div style={{ marginTop: 6, opacity: 0.85 }}>{m.hint}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onAddMissions(missions.map((m) => m.id))}
            style={{ marginTop: 12, width: '100%' }}
          >
            Добавить мини-миссии
          </button>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: 12, width: '100%' }}>
        Назад
      </button>
    </div>
  )
}
