import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { Lecture, LectureStatus } from '../data/lectures'
import type { Test } from '../data/tests'

type Props = {
  lectures: Lecture[]
  tests: Test[]
  onOpenTest: (testId: string) => void
  onGoLectures: () => void
}

type Access = 'locked' | 'available'

function accessForLectureStatus(status: LectureStatus): Access {
  // тест открывается ТОЛЬКО если лекция done
  return status === 'done' ? 'available' : 'locked'
}

function badge(access: Access) {
  return access === 'available'
    ? { text: '✅ Доступно', cls: 'badge success' }
    : { text: '🔒 Закрыто', cls: 'badge locked' }
}

export default function TestsSpisocScreen({ lectures, tests, onOpenTest, onGoLectures }: Props) {
  const lectureById = new Map(lectures.map((l) => [l.id, l]))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <div>
          <h1>Тесты</h1>
          <p>Тест открывается только после прохождения соответствующей лекции.</p>
        </div>

        <Button variant="secondary" onClick={onGoLectures}>
          К лекциям
        </Button>
      </div>

      <div className="stack mtop">
        {tests.map((t) => {
          const lecture = lectureById.get(t.lectureId)
          const status: LectureStatus = lecture?.status ?? 'locked'
          const access = accessForLectureStatus(status)
          const disabled = access !== 'available'
          const b = badge(access)

          return (
            <Card key={t.id} className={disabled ? '' : 'accent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <CardTitle>{t.title}</CardTitle>
                <span className={b.cls}>{b.text}</span>
              </div>

              <CardText>{t.description}</CardText>

              <div className="divider" />

              <div style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--muted2)' }}>
                <div>Лекция: {lecture ? lecture.title : 'не найдена'}</div>
                <div>Вопросов: {t.questions.length}</div>
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <Button variant={disabled ? 'ghost' : 'primary'} disabled={disabled} onClick={() => onOpenTest(t.id)}>
                  Начать тест
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}