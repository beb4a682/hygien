import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type LectureStatus = 'locked' | 'available' | 'done'

type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
}

type LecturesScreenProps = {
  lectures: Lecture[]
  onOpenLecture: (id: string) => void
}

function badgeFor(status: LectureStatus) {
  if (status === 'done') return { text: '✅ Пройдено', cls: 'badge success' }
  if (status === 'available') return { text: '▶ Доступно', cls: 'badge' }
  return { text: '🔒 Закрыто', cls: 'badge locked' }
}

export default function LecturesScreen({ lectures, onOpenLecture }: LecturesScreenProps) {
  return (
    <div>
      <h1>Лекции</h1>
      <p>Выбирай тему и проходи шаг за шагом.</p>

      <div className="stack mtop">
        {lectures.map((l) => {
          const b = badgeFor(l.status)

          return (
            <Card key={l.id} className={l.status === 'locked' ? '' : 'accent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <CardTitle>{l.title}</CardTitle>
                <span className={b.cls}>{b.text}</span>
              </div>

              <CardText>{l.description}</CardText>

              <div className="row" style={{ marginTop: 12 }}>
                <Button
                  variant={l.status === 'locked' ? 'ghost' : 'secondary'}
                  disabled={l.status === 'locked'}
                  onClick={() => onOpenLecture(l.id)}
                >
                  Открыть
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}