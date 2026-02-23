import { Card, CardText, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Props = {
  score: number
  maxScore: number
  onTryAgain: () => void
  onGoHome: () => void
}

export default function TestResultScreen({
  score,
  maxScore,
  onTryAgain,
  onGoHome,
}: Props) {
  const ratio = maxScore === 0 ? 0 : score / maxScore
  const percent = Math.round(ratio * 100)

  const mood =
    ratio >= 1
      ? { t: 'Идеально! 🔥', s: 'Ты всё усвоил. Отличная работа!' }
      : ratio >= 0.8
      ? { t: 'Очень хорошо 💙', s: 'Почти без ошибок — супер!' }
      : ratio >= 0.6
      ? { t: 'Неплохо 👍', s: 'Есть над чем поработать.' }
      : { t: 'Стоит повторить 🙂', s: 'Попробуй ещё раз после лекции.' }

  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Результат теста</h1>
          <p>{mood.t}</p>
        </div>

        <div className="pageHeadRight">
          <span className="badge success">{percent}%</span>
          <img src="/mascot-pig2.png" width={54} height={54} alt="" className="pageMascot" />
        </div>
      </div>

      {/* SCORE */}
      <Card className="mtop soft">
        <CardTitle>Твой результат</CardTitle>
        <CardText>{mood.s}</CardText>

        <div className="testScore">
          <div className="testScoreValue">
            {score} / {maxScore}
          </div>

          <div className="progress">
            <div className="progressFill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </Card>

      {/* ACTIONS */}
      <Card className="mtop accent">
        <CardTitle>Что дальше?</CardTitle>
        <CardText>Закрепи результат или иди дальше 🚀</CardText>

        <div className="stack" style={{ marginTop: 12 }}>
          <Button onClick={onGoHome}>На главную</Button>
          <Button variant="secondary" onClick={onTryAgain}>
            Пройти ещё раз
          </Button>
        </div>
      </Card>
    </div>
  )
}