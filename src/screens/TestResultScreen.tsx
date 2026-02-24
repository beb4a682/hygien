import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import './testResult.css'

type Props = {
  score: number
  maxScore: number
  onTryAgain: () => void
  onGoHome: () => void
}

// 🖼 картинки по результату
const RESULT_IMAGES = {
  bad: '/src/assets/result-bad.png',
  ok: '/src/assets/result-badmid.png',
  good: '/src/assets/result-mid.png',
  perfect: '/src/assets/result-good.png',
}

function getResultImage(score: number, total: number) {
  const percent = total === 0 ? 0 : (score / total) * 100

  if (percent <= 25) return RESULT_IMAGES.bad
  if (percent <= 50) return RESULT_IMAGES.ok
  if (percent <= 75) return RESULT_IMAGES.good
  return RESULT_IMAGES.perfect
}

function getResultText(score: number, total: number) {
  const percent = total === 0 ? 0 : (score / total) * 100

  if (percent <= 25) return 'Ничего страшного — попробуем ещё 💙'
  if (percent <= 50) return 'Уже неплохо! Можно лучше 🙂'
  if (percent <= 75) return 'Отличный результат! 💪'
  return 'Идеально! Ты просто супер 🌟'
}

export default function TestResultScreen({
  score,
  maxScore,
onTryAgain,
onGoHome
}: Props) {
  const percent = Math.round((score / maxScore) * 100)
  const resultImage = getResultImage(score, maxScore)
  const resultText = getResultText(score, maxScore)

  return (
    <div className="testResultPage">
      {/* HERO */}
      <div className="testResultHero">
        <div>
          <div className="testResultTitle">Тест завершён</div>
          <div className="testResultSub">{resultText}</div>
        </div>

        <div className="testResultPill">
          {score} / {maxScore}
        </div>

        {/* пузыри */}
        <img className="testResultBubble b1" src="/img/home/bubble.png" alt="" />
        <img className="testResultBubble b2" src="/img/home/bubble.png" alt="" />
      </div>

      {/* 🖼 КАРТИНКА ПО РЕЗУЛЬТАТУ */}
      <div className="testResultImage">
        <img src={resultImage} alt="" />
      </div>

      {/* RESULT CARD */}
      <Card className="soft">
        <CardTitle>Твой результат</CardTitle>

        <div className="testResultScore">
          {percent}% правильных ответов
        </div>

        <CardText>
          Ты ответил правильно на <b>{score}</b> из <b>{maxScore}</b> вопросов.
        </CardText>
      </Card>

      {/* ACTIONS */}
      <Card className="soft">
        <CardTitle>Что дальше?</CardTitle>
        <CardText>Можешь попробовать ещё раз или вернуться на главную</CardText>

        <div className="testResultActions">
          <Button onClick={onTryAgain}>Пройти ещё раз</Button>
          <Button variant="secondary" onClick={onGoHome}>
            На главную
          </Button>
        </div>
      </Card>
    </div>
  )
}