import { useState } from 'react'
import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Question = {
  question: string
  options: string[]
  correct: number
}

type Test = {
  id: string
  title: string
  questions: Question[]
}

type Props = {
  test: Test
  onBack: () => void
  onFinish: (correct: number, total: number) => void
}

export default function TestViewScreen({ test, onBack, onFinish }: Props) {
  const total = test.questions.length
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const q = test.questions[index]

  const percent = Math.round(((index + 1) / total) * 100)

  const select = (i: number) => {
    if (answers[index] !== undefined) return
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = i
      return next
    })
  }

  const next = () => {
    if (index + 1 < total) setIndex(index + 1)
    else {
      const correct = test.questions.reduce(
        (s, qq, i) => s + (answers[i] === qq.correct ? 1 : 0),
        0
      )
      onFinish(correct, total)
    }
  }

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>{test.title}</h1>
          <p>
            Вопрос {index + 1} из {total}
          </p>
        </div>

        <div className="pageHeadRight">
          <span className="badge">{percent}%</span>
          <img
            src="/mascot-pig-thinking.png"
            width={52}
            height={52}
            alt=""
            className="pageMascot"
          />
        </div>
      </div>

      {/* progress */}
      <div className="progress mtop">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </div>

      {/* QUESTION */}
      <Card className="mtop soft">
        <CardTitle>{q.question}</CardTitle>
        <CardText>Выбери один правильный вариант.</CardText>
      </Card>

      {/* ANSWERS */}
      <div className="stack mtop">
        {q.options.map((opt, i) => {
          const picked = answers[index] === i
          const correct = answers[index] !== undefined && i === q.correct

          return (
            <button
              key={i}
              className={`answerBtn ${
                picked ? (correct ? 'answerOk' : 'answerBad') : ''
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

        <Button disabled={answers[index] === undefined} onClick={next}>
          {index + 1 === total ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}