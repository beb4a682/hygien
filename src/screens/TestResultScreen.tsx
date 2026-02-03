import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { TipBox } from '../components/ui/TipBox'

type TestResultScreenProps = {
  score: number
  maxScore: number
  onGoHome: () => void
  onTryAgain: () => void
}

function pickTip(percent: number) {
  if (percent >= 85) return 'Супер! Закрепи: сделай это один раз сегодня и отметь как миссию.'
  if (percent >= 60) return 'Хорошо! Выбери один пункт и попробуй сделать его сегодня.'
  return 'Нормально: мы учимся шаг за шагом. Пройди ещё раз и возьми один простой шаг в миссии.'
}

function pickMascotLine(percent: number) {
  if (percent >= 85) return '🐷 «Ты красавчик. Я вижу прогресс!»'
  if (percent >= 60) return '🐷 «Круто! Чуть-чуть — и будет идеально»'
  return '🐷 «Это не экзамен. Это тренировка»'
}

export default function TestResultScreen({
  score,
  maxScore,
  onGoHome,
  onTryAgain,
}: TestResultScreenProps) {
  const percent = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100)

  const verdict =
    percent >= 85 ? 'Отлично!' : percent >= 60 ? 'Хорошо!' : 'Начало положено!'

  const mascotLine = pickMascotLine(percent)
  const tip = pickTip(percent)

  return (
    <div className="stack">
      <Card>
        <CardTitle>{verdict}</CardTitle>
        <CardText>
          Правильных ответов: <strong>{score}</strong> из {maxScore} ({percent}%)
        </CardText>

        <div className="mtop" style={{ opacity: 0.9 }}>
          {mascotLine}
        </div>
      </Card>

      <TipBox title="Совет Чистюли">{tip}</TipBox>

      <div className="row mtop">
        <Button onClick={onTryAgain} variant="secondary">
          Пройти ещё раз
        </Button>
        <Button onClick={onGoHome}>На главную</Button>
      </div>
    </div>
  )
}
