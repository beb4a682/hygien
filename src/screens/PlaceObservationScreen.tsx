import { useEffect, useMemo, useState } from 'react'
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

const labelFor = (v: number) => {
  if (v === 1) return 'Нет 😕'
  if (v === 2) return 'Скорее нет 🙁'
  if (v === 3) return '50/50 🤔'
  if (v === 4) return 'Скорее да 🙂'
  return 'Да 😄'
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
  const [step, setStep] = useState(0)

  useEffect(() => {
    setValues(init)
    setStep(0)
  }, [init])

  const total = criteria.length
  const current = criteria[step]

  const title = current?.title ?? current?.label ?? 'Пункт'
  const hint = current?.hint ?? current?.desc ?? ''
  const v = current ? values[current.id] ?? 3 : 3

  const percent = total === 0 ? 0 : Math.round(((step + 1) / total) * 100)

  const setScore = (score: number) => {
    if (!current) return
    setValues((prev) => ({ ...prev, [current.id]: score }))
  }

  const goNext = () => {
    if (step + 1 < total) setStep((s) => s + 1)
    else onSubmit(values)
  }

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1)
    else onBack()
  }

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>{placeTitle}</h1>
          <p>
            Пункт {Math.min(step + 1, total)} из {total}
          </p>
        </div>

        <div className="pageHeadRight">
          <span className="badge">{percent}%</span>
        </div>
      </div>

      <div className="progress mtop">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </div>

      <Card className="mtop soft">
        <CardTitle>Шкала</CardTitle>
        <CardText>Потяни “язычок” и выбери ответ</CardText>
      </Card>

      <Card className="mtop accent obsCard">
        <div className="obsTop">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="obsTitleRow">
              <CardTitle>{title}</CardTitle>
              <span className={`scorePill v${v}`}>{labelFor(v)}</span>
            </div>

            {hint ? <div className="obsHint">{hint}</div> : null}
          </div>
        </div>

        {/* СЛАЙДЕР */}
        <div className="sliderWrap">
          <div className="sliderRow">
            <span className="sliderN">1</span>

            <input
              className={`slider v${v}`}
              type="range"
              min={1}
              max={5}
              step={1}
              value={v}
              onChange={(e) => setScore(Number(e.target.value))}
              aria-label={title}
            />

            <span className="sliderN">5</span>
          </div>

          <div className="sliderMeta">
            <span className="chip soft">💡 Оцени честно</span>
          </div>
        </div>
      </Card>

      <div className="row mtop" style={{ justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={goPrev}>
          {step === 0 ? 'Назад' : 'Предыдущий'}
        </Button>

        <Button onClick={goNext}>
          {step + 1 === total ? 'Готово' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}