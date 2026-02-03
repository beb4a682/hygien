import { useEffect, useMemo, useRef, useState } from 'react'
import type { LectureCard } from '../data/lectureCards'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Props = {
  title: string
  cards: LectureCard[]
  onBack: () => void
  onDone: () => void
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function LectureCardsScreen({ title, cards, onBack, onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const total = cards.length
  const current = useMemo(() => cards[index], [cards, index])

  // клавиши как бонус на ПК
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total])

  const prev = () => {
    setDirection('prev')
    setIndex((i) => clamp(i - 1, 0, total - 1))
  }

  const next = () => {
    setDirection('next')
    if (index >= total - 1) onDone()
    else setIndex((i) => clamp(i + 1, 0, total - 1))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || startX.current == null) return
    setDragX(e.clientX - startX.current)
  }

  const endDrag = () => {
    if (!dragging) return
    setDragging(false)

    // порог свайпа
    const threshold = 60
    if (dragX <= -threshold) next()
    else if (dragX >= threshold) prev()

    setDragX(0)
    startX.current = null
  }

  if (!current) return null

  const isLast = index === total - 1

  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>{title}</h1>

      {/* прогресс */}
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
        Карточка {index + 1} / {total}
      </div>

      {/* точки */}
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        {cards.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 18 : 8,
              height: 8,
              borderRadius: 999,
              background: i === index ? '#999' : '#ddd',
              transition: 'all 180ms ease',
            }}
          />
        ))}
      </div>

      {/* карточка */}
      <Card
      
        className={current.variant === 'tip' ? 'tipCard lectureCard' : 'lectureCard'}
      >
        <div
          key={current.id}
          className={`cardMotion ${direction}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            marginTop: 14,
            padding: 16,
            borderRadius: 16,
            background: '#f5f5f5',
            userSelect: 'none',
            touchAction: 'pan-y',
            transform: `translateX(${dragX}px)`,
            transition: dragging ? 'none' : 'transform 220ms ease',
          }}
        >

          {current.variant === 'tip' && (
            <div className="tipBadge">Совет 💡</div>
          )}

          <div style={{ fontWeight: 800, fontSize: 18 }}>{current.title}</div>

          {current.image && (
            <img
              src={current.image}
              alt=""
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 14,
                marginTop: 12,
              }}
            />
          )}

          <div style={{ marginTop: 12, whiteSpace: 'pre-line', lineHeight: 1.45 }}>
            {current.body}
          </div>
        </div>
      </Card>


      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
        <Button variant="ghost" onClick={prev} disabled={index === 0}>
          ← Назад
        </Button>

        <Button onClick={next}>
          {isLast ? 'Я понял ✅' : 'Дальше →'}
        </Button>
      </div>

    </div>
  )
}
