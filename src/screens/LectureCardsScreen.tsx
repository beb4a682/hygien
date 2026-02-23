import { useState } from 'react'
import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type LectureCard = {
  id: string
  title: string
  body: string
  image?: string
  variant?: 'default' | 'tip'
}

type Props = {
  title: string
  cards: LectureCard[]
  onBack: () => void
  onDone: () => void
}

export default function LectureCardsScreen({
  title,
  cards,
  onBack,
  onDone,
}: Props) {
  const [index, setIndex] = useState(0)
  const total = cards.length
  const card = cards[index]

  const percent = Math.round(((index + 1) / total) * 100)

  const next = () => {
    if (index + 1 < total) setIndex(index + 1)
    else onDone()
  }

  return (
    <div>
      {/* HEADER */}
      <div className="pageHead">
        <div>
          <h1>{title}</h1>
          <p>
            Карточка {index + 1} из {total}
          </p>
        </div>

        <div className="pageHeadRight">
          <span className="badge">{percent}%</span>
          <img
            src="/mascot-pig-thinking.png"
            width={52}
            height={52}
            alt=""
            className="pageMascot"
          />
        </div>
      </div>

      {/* PROGRESS */}
      <div className="progress mtop">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </div>

      {/* CARD */}
      <Card className={`mtop lectureCardView ${card.variant === 'tip' ? 'lectureTip' : ''}`}>
        {card.image && (
          <img
            src={card.image}
            alt=""
            className="lectureImage"
          />
        )}

        <CardTitle>{card.title}</CardTitle>

        <CardText>
          {card.body.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </CardText>

        {card.variant === 'tip' && (
          <div className="lectureTipBox">
            💡 Запомни: маленькие привычки работают лучше всего
          </div>
        )}
      </Card>

      {/* CONTROLS */}
      <div className="row mtop" style={{ justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={onBack}>
          Назад
        </Button>

        <Button onClick={next}>
          {index + 1 === total ? 'Завершить лекцию' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}