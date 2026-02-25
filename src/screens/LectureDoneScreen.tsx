import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { Lecture } from '../data/lectures'
import './lectureDone.css'

type Props = {
  lecture: Lecture
  rewardXp?: number
  onGoTest: () => void
  onGoLectures: () => void
}

export default function LectureDoneScreen({
  lecture,
  rewardXp = 10,
  onGoTest,
  onGoLectures,
}: Props) {
  return (
    <div className="lectureDonePage">
      {/* HERO */}
      <div className="lectureDoneHero">
        <div className="lectureDoneHeroLeft">
          <div className="lectureDoneTitle">
            Лекция пройдена <span className="party">🎉</span>
          </div>
          <div className="lectureDoneSub">
            Ты отлично справился. Маленький шаг — большой результат.
          </div>
        </div>

        

        {/* пузыри */}
        <img className="lectureDoneBubble b1" src="/img/home/bubble.png" alt="" />
        <img className="lectureDoneBubble b2" src="/img/home/bubble.png" alt="" />
      </div>

      {/* 🔹 МЕСТО ПОД КАРТИНКУ (между hero и карточкой лекции) */}
      <div className="lectureDoneMidImage">
        <img src="/src/assets/result-good.png" alt=""></img>
      </div>

      {/* LECTURE CARD */}
      <Card className="lectureDoneCard soft">
        <div className="lectureDoneLectureRow">
          <div className="lectureDoneLectureIcon">📘</div>

          <div>
            <div className="lectureDoneLectureTitle">{lecture.title}</div>
            <div className="lectureDoneLectureSub">
              Лекция завершена и засчитана в прогресс
            </div>
          </div>
        </div>
      </Card>

      {/* STATS */}
      <div className="lectureDoneStats">
        <Card className="lectureDoneStat">
          <div className="statLabel">НАГРАДА</div>
          <div className="statValue">+{rewardXp} XP</div>
        </Card>

        <Card className="lectureDoneStat">
          <div className="statLabel">СТАТУС</div>
          <div className="statValue ok">Пройдено ✅</div>
        </Card>
      </div>

      {/* NEXT */}
      <Card className="lectureDoneNext soft">
        <CardTitle>Что дальше?</CardTitle>
        <CardText>
          Можешь проверить себя в тесте или перейти к следующей лекции.
        </CardText>

        <div className="lectureDoneActions">
          

          <Button variant="secondary" onClick={onGoLectures}>
            К списку лекций
          </Button>
        </div>
      </Card>

      {/* TIP */}
      <Card className="lectureDoneTip">
        <div className="lectureDoneTipRow">
          <img
            src="/img/lectures/tip.png"
            alt=""
            className="lectureDoneTipPig"
          />

          <div>
            <div className="lectureDoneTipTitle">Совет</div>
            <div className="lectureDoneTipText">
              Лучше проходить тест сразу после лекции — так знания
              запоминаются лучше 💡
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}