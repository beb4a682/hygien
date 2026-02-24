import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import './lectures.css'

type LectureStatus = 'locked' | 'available' | 'done'

type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
  image?: string // /img/lectures/xxx.png
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

export default function LecturesScreen({ lectures, onOpenLecture }: LecturesScreenProps) {
  const totalCount = lectures.length
  const availableCount = lectures.filter((l) => l.status !== 'locked').length

  return (
    <div>
      {/* HERO */}
      <div className="lecturesHero">
        <div className="lecturesHeroRow">
          <div>
            <div className="lecturesHeroTitle">Лекции</div>
            <div className="lecturesHeroSub">
              Открываются по порядку. Проходи шаг за шагом — потом можно перейти к тесту.
            </div>
          </div>

          <div className="lecturesHeroBadge">
  <div className="lecturesHeroBadgeStack">
    <img className="lecturesHeroIcon" src="/img/home/ic-lectures.png" alt="" />
    <div className="lecturesCountPill">
      <div className="lecturesCountTop">доступно</div>
      <div className="lecturesCountValue">
        {availableCount}/{totalCount}
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

  
      {/* LIST */}
      <div className="stack mtop">
        {lectures.map((l) => {
          const b = badgeFor(l.status)
          const locked = l.status === 'locked'

          return (
            <button
              key={l.id}
              className="lectureItemBtn"
              disabled={locked}
              onClick={() => !locked && onOpenLecture(l.id)}
              aria-label={locked ? `${l.title} недоступно` : `Открыть лекцию ${l.title}`}
            >
              <Card className={`lectureItem ${locked ? 'locked' : ''} ${l.status === 'done' ? 'done' : ''}`}>
                {/* LEFT */}
                <div className="lectureItemLeft">
                  <div className="lectureTitleRow">
                    <CardTitle>{l.title}</CardTitle>
                    <span className={b.cls}>
                      {b.icon} {b.text}
                    </span>
                  </div>
                   <div className="lectureItemMedia" aria-hidden="true">
                  {l.image ? (
                    <img src={l.image} alt="" />
                  ) : (
                    <div className="lectureMediaPlaceholder">Тут будет картинка</div>
                  )}
                </div>
                  <div className="lectureItemDesc">
                    <CardText>{l.description}</CardText>
                  </div>

                  <div className="lectureBottom">
                    <Button
                      variant={locked ? 'ghost' : 'secondary'}
                      disabled={locked}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!locked) onOpenLecture(l.id)
                      }}
                    >
                      {locked ? 'Недоступно' : l.status === 'done' ? 'Повторить' : 'Открыть'}
                    </Button>

                    <span className="lectureHint">
                      {locked
                        ? 'Пройди предыдущую лекцию, чтобы открыть эту'
                        : l.status === 'done'
                          ? 'Можно пройти ещё раз'
                          : 'Сначала пройди — потом тест'}
                    </span>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}