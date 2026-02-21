import { useMemo, useState } from 'react'
import type { Test } from '../data/tests'

type Props = {
  test: Test
  onFinish: (correct: number, total: number) => void
  onBack: () => void
}

export default function TestViewScreen({ test, onFinish, onBack }: Props) {
  const total = test.questions.length
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const q = test.questions[index]
  const picked = answers[q.id]

  const correctCount = useMemo(() => {
    return test.questions.reduce((acc, qq) => {
      const a = answers[qq.id]
      if (a === qq.correctIndex) return acc + 1
      return acc
    }, 0)
  }, [answers, test.questions])

  function pick(i: number) {
    setAnswers((p) => ({ ...p, [q.id]: i }))
  }

  function next() {
    if (index < total - 1) setIndex((v) => v + 1)
  }

  function prev() {
    if (index > 0) setIndex((v) => v - 1)
  }

  function finish() {
    onFinish(correctCount, total)
  }

  return (
    <div style={{ padding: 16 }}>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>{test.title}</h1>
      <div style={{ fontSize: 12, opacity: 0.75 }}>
        Вопрос {index + 1} / {total}
      </div>

      <div style={{ marginTop: 14, fontWeight: 800 }}>{q.text}</div>

      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        {q.options.map((opt, i) => {
          const active = picked === i
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                textAlign: 'left',
                padding: 12,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.15)',
                background: active ? 'rgba(0,0,0,0.06)' : 'white',
                cursor: 'pointer',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={prev} disabled={index === 0}>
          Назад
        </button>

        {index < total - 1 ? (
          <button onClick={next} disabled={picked == null}>
            Дальше
          </button>
        ) : (
          <button onClick={finish} disabled={Object.keys(answers).length !== total}>
            Завершить
          </button>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
        Чтобы завершить, нужно ответить на все вопросы.
      </div>
    </div>
  )
}