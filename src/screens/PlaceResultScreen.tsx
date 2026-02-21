import { PLACE_CRITERIA, type Criterion } from '../data/placeCriteria'
import type { PlaceId } from '../data/observationMissions'
import { getWeakCriterionIds } from '../utils/pickObservationMissions'

type Props = {
  placeId: PlaceId
  placeTitle: string
  values: Record<string, number>
  onBack: () => void
}

function calcScore(criteria: Criterion[], values: Record<string, number>) {
  let score = 0
  let max = 0
  for (const c of criteria) {
    const v = values[c.id] ?? 1 // 1..5
    score += v * c.weight
    max += 5 * c.weight
  }
  return { score, max }
}

function levelTitleByScore(score: number, max: number) {
  if (max <= 0) return 'Нормально'
  const p = Math.round((score / max) * 100)
  if (p >= 85) return 'Отлично'
  if (p >= 65) return 'Хорошо'
  if (p >= 45) return 'Нормально'
  if (p >= 25) return 'Плохо'
  return 'Очень плохо'
}

function tipByCriterionId(id: string) {
  const map: Record<string, string> = {
    k1: 'Протри стол и поверхности — липкость и пятна собирают микробы.',
    k2: 'Убери крошки и упаковки: мусор быстро делает кухню грязной.',
    k3: 'Проверь мыло и воду рядом — так проще мыть руки перед едой.',
    k4: 'Если есть запах — проветри и вынеси мусор.',
    k5: 'Убери грязные салфетки и посуду с глаз.',
    b1: 'Протри раковину и кран.',
    b2: 'Мыло должно быть под рукой.',
    b3: 'Используй чистое полотенце.',
    b4: 'Убери воду с пола.',
    b5: 'Проветри ванную.',
    c1: 'Протри парту.',
    c2: 'Убери мусор вокруг.',
    c3: 'После улицы лучше помыть руки.',
    c4: 'Свежий воздух помогает самочувствию.',
    c5: 'Разложи вещи.',
    s1: 'Не трогай мусор руками.',
    s2: 'Избегай грязных поверхностей.',
    s3: 'После улицы протри руки.',
    s4: 'Избегай мест с дымом и вонью.',
    s5: 'Обходи опасные предметы.',
  }

  return map[id] ?? 'Сделай небольшой шаг к чистоте.'
}

export default function PlaceResultScreen({ placeId, placeTitle, values, onBack }: Props) {
  const criteria = PLACE_CRITERIA[placeId] ?? []

  const { score, max } = calcScore(criteria, values)
  const label = levelTitleByScore(score, max)

  const weakIds = getWeakCriterionIds(placeId, criteria, values, 2)
  const tips = weakIds.map(tipByCriterionId)

  return (
    <div style={{ padding: 16 }}>
      <h1>Результат</h1>

      <div style={{ marginTop: 8, opacity: 0.8 }}>
        Место: <strong>{placeTitle}</strong>
      </div>

      <div
        style={{
          marginTop: 12,
          borderRadius: 16,
          padding: 14,
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#fff',
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.75 }}>Оценка</div>
        <div style={{ marginTop: 6, fontSize: 20, fontWeight: 900 }}>{label}</div>
      </div>

      <div
        style={{
          marginTop: 12,
          borderRadius: 16,
          padding: 14,
          border: '1px solid rgba(0,0,0,0.08)',
          background: 'rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.75 }}>Советы</div>
        <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
          {tips.length > 0 ? (
            tips.map((t, i) => (
              <div key={i} style={{ fontSize: 13 }}>
                • {t}
              </div>
            ))
          ) : (
            <div style={{ fontSize: 13 }}>
              Всё выглядит нормально. Можно просто поддерживать порядок.
            </div>
          )}
        </div>
      </div>

      <button onClick={onBack} style={{ marginTop: 14, width: '100%' }}>
        Назад
      </button>
    </div>
  )
}