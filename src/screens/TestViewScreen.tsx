import { useState } from 'react'
import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { Test } from '../data/tests'

type Props = {
  test: Test
  onBack: () => void
  onFinish: (correct: number, total: number) => void
}

// вытаскиваем варианты ответа из любого распространённого поля
function getOptions(q: any): string[] {
  const v =
    q?.answers ??
    q?.options ??
    q?.variants ??
    q?.choices ??
    q?.items ??
    []
  return Array.isArray(v) ? v : []
}

// вытаскиваем текст вопроса
function getQuestionText(q: any): string {
  return String(q?.text ?? q?.question ?? q?.title ?? 'Вопрос')
}

// вытаскиваем индекс правильного ответа
function getCorrectIndex(q: any): number {
  const v = q?.correctIndex ?? q?.correct ?? q?.answerIndex ?? q?.rightIndex
  return typeof v === 'number' ? v : 0
}

export default function TestViewScreen({ test, onBack, onFinish }: Props) {
  const total = test.questions.length
  const [index, setIndex] = useState(0)
  const [pickedAnswers, setPickedAnswers] = useState<number[]>([])

  const q = test.questions[index] as any
  const options = getOptions(q)
  const correctIndex = getCorrectIndex(q)

  const percent = total === 0 ? 0 : Math.round(((index + 1) / total) * 100)

  const select = (i: number) => {
    if (pickedAnswers[index] !== undefined) return
    setPickedAnswers((prev) => {
      const next = [...prev]
      next[index] = i
      return next
    })
  }

  const next = () => {
    if (index + 1 < total) setIndex(index + 1)
    else {
      const correct = test.questions.reduce((s: number, qq: any, i: number) => {
        const ci = getCorrectIndex(qq)
        return s + (pickedAnswers[i] === ci ? 1 : 0)
      }, 0)

      onFinish(correct, total)
    }
  }

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>{test.title}</h1>
          <p>
            Вопрос {Math.min(index + 1, total)} из {total}
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
        <CardTitle>{getQuestionText(q)}</CardTitle>
        <CardText>Выбери один правильный вариант.</CardText>
      </Card>

      <div className="stack mtop">
        {options.map((opt: string, i: number) => {
          const picked = pickedAnswers[index] === i
          const isCorrect = pickedAnswers[index] !== undefined && i === correctIndex

          return (
            <button
              key={i}
              className={`answerBtn ${
                picked ? (isCorrect ? 'answerOk' : 'answerBad') : ''
              }`}
              onClick={() => select(i)}
            >
              <span className="answerIndex">{String.fromCharCode(65 + i)}</span>
              <span className="answerText">{opt}</span>
            </button>
          )
        })}
      </div>

      <div className="row mtop" style={{ justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={onBack}>
          Выйти
        </Button>

        <Button disabled={pickedAnswers[index] === undefined} onClick={next}>
          {index + 1 === total ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}