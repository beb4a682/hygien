import { useMemo, useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import type { LectureCard } from '../data/lectureCards'
import './lectureCards.css'

type Props = {
  title: string
  cards: LectureCard[]
  onBack: () => void
  onDone: () => void
}

export default function LectureCardsScreen({ title, cards, onBack, onDone }: Props) {
  const total = Math.max(1, cards.length)
  const [index, setIndex] = useState(0)

  // если меняется лекция/набор карточек — сбрасываем на первую
  useEffect(() => {
    setIndex(0)
  }, [title, cards])

  const safeIndex = Math.min(Math.max(0, index), total - 1)
  const card = cards[safeIndex]

  const percent = useMemo(() => Math.round(((safeIndex + 1) / total) * 100), [safeIndex, total])

  const canPrev = safeIndex > 0
  const isLast = safeIndex === total - 1

  return (
    <div className="lcPage">
      {/* HERO */}
      <div className="lcHero">
        <div className="lcHeroLeft">
          <div className="lcHeroTitle">{title}</div>
          <div className="lcHeroSub">
            Карточка {safeIndex + 1} из {total}
          </div>
        </div>

        <div className="lcHeroRight">
          <div className="lcPercentPill">{percent}%</div>
          <img className="lcHeroPig" src="/img/home/ic-lectures.png" alt="" />
        </div>

        <img className="lcBubble b1" src="/img/home/bubble.png" alt="" />
        <img className="lcBubble b2" src="/img/home/bubble.png" alt="" />
        <img className="lcBubble b3" src="/img/home/bubble.png" alt="" />
      </div>

      {/* PROGRESS BAR */}
      <div className="lcProgressWrap">
        <div className="lcProgress">
          <div className="lcProgressFill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* CARD */}
      <Card className="lcCard soft">
        <div className="lcCardTitle">{card?.title ?? ''}</div>
        <div className="lcCardText">{card?.body ?? ''}</div>

        <div className="lcImageWrap">
          {card?.image ? (
            <img className="lcImage" src={card.image} alt="" />
          ) : (
            <div className="lcImagePlaceholder">
              <span>Тут будет картинка</span>
            </div>
          )}
        </div>
      </Card>

      {/* NAV BUTTONS */}
      <div className="lcNav">
        <button
          type="button"
          className={`lcNavBtn ghost ${!canPrev ? 'disabled' : ''}`}
          disabled={!canPrev}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Назад
        </button>

        <button
          type="button"
          className="lcNavBtn primary"
          onClick={() => {
            if (isLast) onDone()
            else setIndex((i) => Math.min(total - 1, i + 1))
          }}
        >
          {isLast ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </div>
  )
}