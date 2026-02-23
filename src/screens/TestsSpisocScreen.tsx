import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type LectureStatus = 'locked' | 'available' | 'done'
type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
}

type Test = {
  id: string
  title: string
  lectureId: string
  questions: any[]
}

type Props = {
  lectures: Lecture[]
  tests: Test[]
  onGoLectures: () => void
  onOpenTest: (testId: string) => void
}

function getLectureStatus(lectures: Lecture[], lectureId: string): LectureStatus {
  return lectures.find((l) => l.id === lectureId)?.status ?? 'locked'
}

export default function TestsSpisocScreen({ lectures, tests, onGoLectures, onOpenTest }: Props) {
  const availableCount = tests.filter((t) => getLectureStatus(lectures, t.lectureId) === 'done').length

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Тесты</h1>
          <p>Открываются после прохождения соответствующей лекции.</p>
        </div>

        <div className="pageHeadRight">
          <div className="badge">
            🧠 доступно {availableCount}/{tests.length}
          </div>
          <img src="/mascot-pig.png" width={54} height={54} alt="" className="pageMascot" />
        </div>
      </div>

      <Card className="mtop soft">
        <CardTitle>Правило</CardTitle>
        <CardText>
          Сначала пройди лекцию → потом откроется тест ✅
        </CardText>

        <div className="row" style={{ marginTop: 12 }}>
          <Button variant="secondary" onClick={onGoLectures}>
            Перейти к лекциям
          </Button>
        </div>
      </Card>

      <div className="stack mtop">
        {tests.map((t) => {
          const status = getLectureStatus(lectures, t.lectureId)
          const locked = status !== 'done'
          const lectureTitle = lectures.find((l) => l.id === t.lectureId)?.title ?? 'Лекция'

          return (
            <Card key={t.id} className={`testCard ${locked ? 'testCardLocked' : 'accent'}`}>
              <div className="testTop">
                <div className={`testBubble ${locked ? 'lock' : 'go'}`} aria-hidden="true">
                  {locked ? '🔒' : '📝'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="testTitleRow">
                    <CardTitle>{t.title}</CardTitle>
                    <span className={`badge ${locked ? 'locked' : ''}`}>
                      {locked ? '🔒 закрыто' : '✅ доступно'}
                    </span>
                  </div>

                  <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted2)', fontWeight: 850 }}>
                    Привязан к лекции: <span style={{ color: 'var(--text)' }}>{lectureTitle}</span>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <span className="chip">
                      {t.questions?.length ?? 0} вопросов
                    </span>
                  </div>
                </div>
              </div>

              <div className="testBottom">
                <Button
                  variant={locked ? 'ghost' : 'secondary'}
                  disabled={locked}
                  onClick={() => onOpenTest(t.id)}
                >
                  {locked ? 'Недоступно' : 'Начать'}
                </Button>

                <span className="testHint">
                  {locked ? 'Сначала заверши лекцию' : 'Удачи!'}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}