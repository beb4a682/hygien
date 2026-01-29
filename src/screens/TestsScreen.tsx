import { useState } from 'react'

type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

type Question = {
  id: string
  text: string
  answers: Answer[]
}

type TestsScreenProps = {
  onSubmit: (score: number, maxScore: number) => void
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Когда нужно мыть руки?',
    answers: [
      { id: 'a1', text: 'Перед едой', isCorrect: true },
      { id: 'a2', text: 'Только если они грязные', isCorrect: false },
      { id: 'a3', text: 'Раз в день', isCorrect: false },
    ],
  },
  {
    id: 'q2',
    text: 'Сколько секунд нужно мыть руки?',
    answers: [
      { id: 'a1', text: '5 секунд', isCorrect: false },
      { id: 'a2', text: '20 секунд', isCorrect: true },
      { id: 'a3', text: '1 минуту', isCorrect: false },
    ],
  },
  {
    id: 'q3',
    text: 'Что нужно делать при мытье рук?',
    answers: [
      { id: 'a1', text: 'Тереть только ладони', isCorrect: false },
      { id: 'a2', text: 'Тереть между пальцами', isCorrect: true },
      { id: 'a3', text: 'Просто намочить водой', isCorrect: false },
    ],
  },
]

function TestsScreen({ onSubmit }: TestsScreenProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

  const handleSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleSubmit = () => {
    const correctCount = QUESTIONS.reduce((total, question) => {
      const selectedAnswerId = selectedAnswers[question.id]
      const selectedAnswer = question.answers.find((answer) => answer.id === selectedAnswerId)
      return total + (selectedAnswer?.isCorrect ? 1 : 0)
    }, 0)

    onSubmit(correctCount, QUESTIONS.length)
  }
  const allAnswered = QUESTIONS.every((q) => Boolean(selectedAnswers[q.id]))

  return (
    <div>
      <h1>Мини-тест</h1>
      <p>Ответь на вопросы, чтобы проверить себя.</p>

      {QUESTIONS.map((q) => (
        <div key={q.id} style={{ marginTop: 16 }}>
          <strong>{q.text}</strong>

          <div style={{ marginTop: 8, display: 'grid', gap: 6 }}>
            {q.answers.map((a) => (
              <label key={a.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="radio"
                  name={q.id}
                  checked={selectedAnswers[q.id] === a.id}
                  onChange={() => handleSelect(q.id, a.id)}
                />
                {a.text}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 24 }}>
        <button onClick={handleSubmit} disabled={!allAnswered}>
  Проверить
</button>

{!allAnswered && (
  <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
    Ответь на все вопросы, чтобы получить результат.
  </div>
)}

      </div>
    </div>
  )
}

export default TestsScreen
