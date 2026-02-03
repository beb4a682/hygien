import { useMemo, useState } from 'react'
import { TESTS } from '../data/tests'

type TestsScreenProps = {
  testId: string
  onSubmit: (score: number, maxScore: number) => void
}

function TestsScreen({ testId, onSubmit }: TestsScreenProps) {
  const test = TESTS[testId]
  const questions = test?.questions ?? []

  // индекс текущего вопроса
  const [step, setStep] = useState(0)

  // выбранные ответы { questionId: answerId }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

  const current = questions[step]

  const selectedForCurrent = current ? selectedAnswers[current.id] : undefined
  const canGoNext = Boolean(selectedForCurrent)

  const progressLabel = useMemo(() => {
    if (!questions.length) return ''
    return `Вопрос ${step + 1} из ${questions.length}`
  }, [questions.length, step])

  const handleSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const computeScore = () => {
    return questions.reduce((total, q) => {
      const pickedId = selectedAnswers[q.id]
      const picked = q.answers.find((a) => a.id === pickedId)
      return total + (picked?.isCorrect ? 1 : 0)
    }, 0)
  }

  const onNext = () => {
    if (!current) return
    if (step < questions.length - 1) {
      setStep((s) => s + 1)
      return
    }
    const score = computeScore()
    onSubmit(score, questions.length)
  }

  const onPrev = () => {
    setStep((s) => Math.max(0, s - 1))
  }

  if (!test) return <p>Тест не найден</p>
  if (!questions.length) return <p>В этом тесте пока нет вопросов</p>
  if (!current) return <p>Ошибка: вопрос не найден</p>

  const isLast = step === questions.length - 1

  return (
    <div>
      <h1>{test.title}</h1>
      <p style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>{progressLabel}</p>

      {/* Прогресс-бар */}
      <div
        style={{
          background: '#eee',
          height: 10,
          borderRadius: 999,
          overflow: 'hidden',
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: `${Math.round(((step + 1) / questions.length) * 100)}%`,
            height: '100%',
            background: '#999',
            transition: 'width 220ms ease',
          }}
        />
      </div>

      {/* Карточка вопроса */}
      <div
        style={{
          marginTop: 14,
          padding: 16,
          borderRadius: 16,
          background: '#f5f5f5',
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18 }}>{current.text}</div>

        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          {current.answers.map((a) => (
            <label
              key={a.id}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                padding: 10,
                borderRadius: 12,
                background: selectedForCurrent === a.id ? '#e9e9e9' : '#fff',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name={current.id}
                checked={selectedForCurrent === a.id}
                onChange={() => handleSelect(current.id, a.id)}
              />
              <span>{a.text}</span>
            </label>
          ))}
        </div>

        {/* Подсказка если не выбрал */}
        {!canGoNext && (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            Выбери вариант ответа, чтобы продолжить.
          </div>
        )}
      </div>

      {/* Навигация */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
        <button onClick={onPrev} disabled={step === 0}>
          ← Назад
        </button>

        <button onClick={onNext} disabled={!canGoNext}>
          {isLast ? 'Проверить' : 'Дальше →'}
        </button>
      </div>
    </div>
  )
}

export default TestsScreen
