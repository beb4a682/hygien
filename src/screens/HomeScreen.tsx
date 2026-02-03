import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { type ProfileState, xpProgress, roleTitle } from '../data/progression'

type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
  onGoPlaceObservation: () => void
  profile: ProfileState

  missionText: string | null
  missionStatus: 'none' | 'active' | 'accepted' | 'done'

  onAcceptMission: () => void
  onCompleteMission: () => void
  onPostponeMission: () => void
}

function HomeScreen({
  onGoLectures,
  onGoTests,
  onGoPlaceObservation,
  profile,
  missionText,
  missionStatus,
  onAcceptMission,
  onCompleteMission,
  onPostponeMission,
}: HomeScreenProps) {
  const { value, need } = xpProgress(profile)
  const percent = Math.min(100, (value / need) * 100)

  return (
    <div>
      <h1>Hygiene Level Up</h1>

      {/* Блок "Кто я сейчас?" */}
      <section>
        <p>Привет, герой чистоты! 🐷</p>

        <div style={{ marginTop: 12 }}>
          <strong>Твоя роль:</strong> {roleTitle(profile.roleLevel)}
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Уровень:</strong> {profile.roleLevel}
        </div>


        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Прогресс до следующей роли</div>

          <div
            style={{
              background: '#eee',
              height: 10,
              borderRadius: 999,
              overflow: 'hidden',
              marginTop: 6,
            }}
          >
            <div
              style={{
                width: `${percent}%`, 
                height: '100%',
                background: '#999',
              }}
            />
          </div>

          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}></div>
           {profile.roleLevel >= 10 ? 'Максимальный уровень' : `${value} / ${need} XP`}
        </div>
      </section>

      <div className="row mtop">
        <Button variant="secondary" onClick={onGoLectures}>Лекции</Button>
        <Button variant="secondary" onClick={onGoTests}>Тесты</Button>
        <Button variant="secondary" onClick={onGoPlaceObservation}>Наблюдение</Button>
      </div>


      {/* Главный CTA */}
      <div style={{ marginTop: 16 }}>
        <h2>Что дальше?</h2>
        <button onClick={onGoLectures}>Продолжить путь</button>
      </div>

      {/* Миссия дня */}
      <Card className="mtop">
  <CardTitle>Миссия дня</CardTitle>
  <CardText>Попробуй выполнить задание и отметь результат.</CardText>

  {/* дальше твоя логика миссии — просто кнопки заменяем */}
  <div className="mtop">
    <div style={{ fontWeight: 700 }}>{missionText ?? 'Пока нет миссии'}</div>

    {missionText && missionStatus === 'active' && (
      <div className="row mtop">
        <Button onClick={onAcceptMission}>Я сделаю</Button>
        <Button variant="ghost" onClick={onPostponeMission}>Позже</Button>
      </div>
    )}

    {missionText && missionStatus === 'accepted' && (
      <div className="row mtop">
        <Button onClick={onCompleteMission}>Выполнил ✅</Button>
      </div>
    )}
  </div>
</Card>

    </div>
  )
}

export default HomeScreen
