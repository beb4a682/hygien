import { useMemo } from 'react'
import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { PlaceId } from '../data/observationMissions'
import { PLACE_CRITERIA } from '../data/placeCriteria'

type Criterion = {
  id: string
  title: string
  desc?: string
  hint?: string
}

type Props = {
  placeId: PlaceId
  placeTitle: string
  values: Record<string, number>
  onBack: () => void
}

const scorePill = (v: number) => {
  if (v >= 4) return { cls: 'scorePill ok', label: 'Отлично' }
  if (v >= 3) return { cls: 'scorePill mid', label: 'Норм' }
  if (v >= 2) return { cls: 'scorePill bad', label: 'Плохо' }
  return { cls: 'scorePill bad', label: 'Очень плохо' }
}

export default function PlaceResultScreen({ placeId, placeTitle, values, onBack }: Props) {
  const criteria: Criterion[] = (PLACE_CRITERIA as any)[placeId] ?? []

  const avg = useMemo(() => {
    if (criteria.length === 0) return 0
    const sum = criteria.reduce((s: number, c: Criterion) => s + (values[c.id] ?? 3), 0)
    return sum / criteria.length
  }, [criteria, values])

  const avgRounded = Math.round(avg * 10) / 10
  const avgPercent = Math.min(100, (avgRounded / 5) * 100)
  const avgP = scorePill(Math.round(avg))

  const weak = useMemo(() => {
    return criteria
      .map((c: Criterion) => ({ id: c.id, title: c.title, v: values[c.id] ?? 3 }))
      .filter((x) => x.v <= 2)
      .sort((a, b) => a.v - b.v)
  }, [criteria, values])

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Результат</h1>
          <p>{placeTitle}</p>
        </div>

        <div className="pageHeadRight">
          <span className={`badge ${avgP.cls}`}>⭐ {avgRounded}</span>
          <img src="/mascot-pig2.png" width={54} height={54} alt="" className="pageMascot" />
        </div>
      </div>

      <Card className="mtop soft">
        <CardTitle>Общий балл</CardTitle>
        <CardText>
          {avgRounded >= 4
            ? 'Очень чисто! Так держать 💙'
            : avgRounded >= 3
            ? 'Хорошо. Есть пару пунктов для улучшения.'
            : 'Есть что подтянуть — но это исправляется быстро!'}
        </CardText>

        <div style={{ marginTop: 12 }}>
          <div className="progress">
            <div className="progressFill" style={{ width: `${avgPercent}%` }} />
          </div>
        </div>
      </Card>

      <Card className="mtop accent">
        <CardTitle>Пункты</CardTitle>
        <CardText>Оценки по каждому пункту.</CardText>

        <div className="stack" style={{ marginTop: 12 }}>
          {criteria.map((c: Criterion) => {
            const v = values[c.id] ?? 3
            const p = scorePill(v)

            return (
              <div key={c.id} className="resultRow">
                <div style={{ flex: 1, minWidth: 0, fontWeight: 950 }}>{c.title}</div>
                <span className={p.cls}>{v}/5</span>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="mtop">
        <CardTitle>Советы</CardTitle>
        <CardText>Небольшие улучшения дают большой эффект ✅</CardText>

        <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
          {weak.length > 0 ? (
            weak.slice(0, 4).map((w) => (
              <div key={w.id} className="miniCard soft">
                <div style={{ fontWeight: 950 }}>{w.title}</div>
                <div style={{ marginTop: 6, fontSize: 13, color: 'var(--muted)' }}>
                  Сделай один маленький шаг сегодня — и завтра будет заметно лучше.
                </div>
              </div>
            ))
          ) : (
            <div className="miniCard soft" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img
                src="/mascot-pig-thinking.png"
                width={56}
                height={56}
                alt=""
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 12px rgba(93,169,233,0.22))',
                }}
              />
              <div>
                <div style={{ fontWeight: 950 }}>Слабых пунктов нет ✨</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                  Отличная работа — место выглядит очень чистым.
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="row mtop">
        <Button variant="secondary" onClick={onBack}>
          Назад
        </Button>
      </div>
    </div>
  )
}