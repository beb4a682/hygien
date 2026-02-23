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
  if (status === 'done') return { text: 'Пройдено', cls: 'badge success', icon: '✅' }
  if (status === 'available') return { text: 'Доступно', cls: 'badge', icon: '▶' }
  return { text: 'Закрыто', cls: 'badge locked', icon: '🔒' }
}

function bubbleFor(status: LectureStatus) {
  if (status === 'done') return { cls: 'lectureBubble done', icon: '🏁' }
  if (status === 'available') return { cls: 'lectureBubble go', icon: '📘' }
  return { cls: 'lectureBubble lock', icon: '🔒' }
}

export default function LecturesScreen({ lectures, onOpenLecture }: LecturesScreenProps) {
  const doneCount = lectures.filter((l) => l.status === 'done').length
  const totalCount = lectures.length

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Лекции</h1>
          <p>Выбирай тему и проходи шаг за шагом.</p>
        </div>

        <div className="pageHeadRight">
          <div className="badge">
            📚 {doneCount}/{totalCount}
          </div>
          <img
            src="/mascot-pig.png"
            width={54}
            height={54}
            alt=""
            className="pageMascot"
          />
        </div>
      </div>

      <div className="stack mtop">
        {lectures.map((l) => {
          const b = badgeFor(l.status)
          const bubble = bubbleFor(l.status)
          const locked = l.status === 'locked'

          return (
            <Card
              key={l.id}
              className={`lectureCard ${locked ? 'lectureCardLocked' : 'accent'}`}
            >
              <div className="lectureTop">
                <div className={bubble.cls} aria-hidden="true">
                  {bubble.icon}
                </div>

                <div className="lectureInfo">
                  <div className="lectureTitleRow">
                    <CardTitle>{l.title}</CardTitle>
                    <span className={b.cls}>
                      {b.icon} {b.text}
                    </span>
                  </div>

                  <CardText>{l.description}</CardText>
                </div>
              </div>

              <div className="lectureBottom">
                <Button
                  variant={locked ? 'ghost' : 'secondary'}
                  disabled={locked}
                  onClick={() => onOpenLecture(l.id)}
                >
                  {locked ? 'Недоступно' : l.status === 'done' ? 'Повторить' : 'Открыть'}
                </Button>

                {!locked && (
                  <span className="lectureHint">
                    {l.status === 'done' ? 'Можно пройти ещё раз' : 'Сначала пройди — потом тест'}
                  </span>
                )}

                {locked && (
                  <span className="lectureHint">
                    Пройди предыдущую лекцию, чтобы открыть эту
                  </span>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}