import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Props = {
  title: string
  onGoHome: () => void
  onBackToLectures: () => void
  onGoTest: () => void
}

export default function LectureDoneScreen({
  title,
  onGoHome,
  onBackToLectures,
  onGoTest,
}: Props) {
  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Лекция пройдена 🎉</h1>
          <p>Ты отлично справился. Маленький шаг — большой результат.</p>
        </div>

        <div className="pageHeadRight">
          <span className="badge success">+10 XP</span>
          <img
            src="/mascot-pig.png"
            width={56}
            height={56}
            alt=""
            className="pageMascot"
          />
        </div>
      </div>

      {/* HERO */}
      <Card className="mtop soft lectureDoneHero">
        <div className="lectureDoneTop">
          <div className="lectureDoneIcon" aria-hidden="true">📘</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="lectureDoneTitle">{title}</div>
            <div className="lectureDoneSub">
              Лекция завершена и засчитана в прогресс
            </div>
          </div>
        </div>

        <div className="lectureDoneStats">
          <div className="miniCard">
            <div className="sectionLabel">Награда</div>
            <div className="statValue">+10 XP</div>
          </div>

          <div className="miniCard">
            <div className="sectionLabel">Статус</div>
            <div className="statValue">Пройдено ✅</div>
          </div>
        </div>
      </Card>

      {/* NEXT */}
      <Card className="mtop accent">
        <CardTitle>Что дальше?</CardTitle>
        <CardText>
          Можешь проверить себя в тесте или перейти к следующей лекции.
        </CardText>

        <div className="stack" style={{ marginTop: 12 }}>
          <Button onClick={onGoTest}>Пройти тест</Button>
          <Button variant="secondary" onClick={onBackToLectures}>
            К списку лекций
          </Button>
        </div>
      </Card>

      {/* FOOT */}
      <Card className="mtop">
        <div className="lectureDoneFooter">
          <img
            src="/mascot-pig-thinking.png"
            width={64}
            height={64}
            alt=""
            className="lectureDoneMascot"
          />

          <div>
            <div style={{ fontWeight: 950 }}>
              Совет
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
              Лучше проходить тест сразу после лекции — так знания запоминаются лучше 💡
            </div>
          </div>
        </div>
      </Card>

      <div className="row mtop">
        <Button variant="ghost" onClick={onGoHome}>
          На главную
        </Button>
      </div>
    </div>
  )
}