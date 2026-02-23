import { useMemo, useState } from 'react'
import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Criterion = {
  id: string
  title?: string
  label?: string
  hint?: string
  desc?: string
}

type Props = {
  placeTitle: string
  criteria: Criterion[]
  onBack: () => void
  onSubmit: (values: Record<string, number>) => void
}

const scoreLabel = (v: number) => {
  if (v >= 4) return { t: 'Отлично', cls: 'scorePill ok' }
  if (v >= 3) return { t: 'Норм', cls: 'scorePill mid' }
  if (v >= 2) return { t: 'Плохо', cls: 'scorePill bad' }
  return { t: 'Очень плохо', cls: 'scorePill bad' }
}

export default function PlaceObservationScreen({
  placeTitle,
  criteria,
  onBack,
  onSubmit,
}: Props) {
  const init = useMemo(() => {
    const obj: Record<string, number> = {}
    for (const c of criteria) obj[c.id] = 3
    return obj
  }, [criteria])

  const [values, setValues] = useState<Record<string, number>>(init)

  const avg = useMemo(() => {
    const ids = criteria.map((c) => c.id)
    const sum = ids.reduce((s, id) => s + (values[id] ?? 3), 0)
    return ids.length ? sum / ids.length : 0
  }, [criteria, values])

  const avgRounded = Math.round(avg * 10) / 10
  const avgPill = scoreLabel(Math.round(avg))

  const setScore = (id: string, v: number) => {
    setValues((prev) => ({ ...prev, [id]: v }))
  }

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>{placeTitle}</h1>
          <p>Оцени каждый пункт по шкале.</p>
        </div>

        <div className="pageHeadRight">
          <span className={`badge ${avgPill.cls}`}>
            ⭐ {avgRounded}
          </span>
          <img
            src="/mascot-pig-thinking.png"
            width={54}
            height={54}
            alt=""
            className="pageMascot"
          />
        </div>
      </div>

      <Card className="mtop soft">
        <CardTitle>Шкала</CardTitle>
        <CardText>1 — очень плохо · 3 — нормально · 5 — отлично</CardText>

        <div className="row" style={{ marginTop: 12, flexWrap: 'wrap' }}>
          <span className="chip">💡 Смотри на реальность, не “идеально”</span>
          <span className="chip">🧼 Цель — улучшить</span>
        </div>
      </Card>

      <div className="stack mtop">
        {criteria.map((c) => {
          const title = c.title ?? c.label ?? 'Пункт'
          const hint = c.hint ?? c.desc ?? ''

          const v = values[c.id] ?? 3
          const pill = scoreLabel(v)

          return (
            <Card key={c.id} className="accent obsCard">
              <div className="obsTop">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="obsTitleRow">
                    <CardTitle>{title}</CardTitle>
                    <span className={pill.cls}>{pill.t}</span>
                  </div>
                  {hint ? <div className="obsHint">{hint}</div> : null}
                </div>
              </div>

              {/* шкала 1..5 */}
              <div className="obsScale" role="radiogroup" aria-label={title}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = n === v
                  return (
                    <button
                      key={n}
                      type="button"
                      className={`obsDot ${active ? 'active' : ''}`}
                      onClick={() => setScore(c.id, n)}
                      aria-checked={active}
                      role="radio"
                    >
                      {n}
                    </button>
                  )
                })}
              </div>

              <div className="obsFooter">
                <span className="obsLegend">
                  {v <= 2 ? 'Нужно улучшить' : v === 3 ? 'Уже неплохо' : 'Супер!'}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="row mtop" style={{ justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={onBack}>
          Назад
        </Button>
        <Button onClick={() => onSubmit(values)}>Готово</Button>
      </div>
    </div>
  )
}