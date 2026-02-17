import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import {
  ACHIEVEMENTS,
  type AchievementId,
  type ProfileState,
  xpProgress,
  roleTitle,
} from '../data/progression'

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

  // полочка достижений
  achievements: AchievementId[]
  onOpenAchievement: (id: AchievementId) => void

  // ✅ мини-миссия (из наблюдения места)
  missionPlaceId: string | null
  miniChecklist: Record<string, boolean>
  onToggleMiniStep: (id: string, value: boolean) => void
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
  achievements,
  onOpenAchievement,
  missionPlaceId,
  miniChecklist,
  onToggleMiniStep,
}: HomeScreenProps) {
  const { value, need } = xpProgress(profile)
  const percent = Math.min(100, (value / need) * 100)

  const unlockedCount = achievements.length
  const totalCount = ACHIEVEMENTS.length

  // ✅ шаги мини-уборки по месту (пока делаем кухню, можно расширять)
  const miniSteps =
    missionPlaceId === 'kitchen'
      ? [
          { id: 'k_step_1', text: 'Протереть стол/столешницу' },
          { id: 'k_step_2', text: 'Убрать крошки и мусор' },
          { id: 'k_step_3', text: 'Положить грязную посуду в мойку/посудомойку' },
          { id: 'k_step_4', text: 'Вынести мусор (если нужно)' },
        ]
      : []

  const checkedCount = miniSteps.reduce((acc, s) => acc + (miniChecklist[s.id] ? 1 : 0), 0)
  const canCompleteMini = miniSteps.length > 0 ? checkedCount >= 3 : true

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

          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>
            {profile.roleLevel >= 10 ? 'Максимальный уровень' : `${value} / ${need} XP`}
          </div>
        </div>
      </section>

      <div className="row mtop">
        <Button variant="secondary" onClick={onGoLectures}>
          Лекции
        </Button>
        <Button variant="secondary" onClick={onGoTests}>
          Тесты
        </Button>
        <Button variant="secondary" onClick={onGoPlaceObservation}>
          Наблюдение
        </Button>
      </div>

      {/* ✅ Полочка достижений */}
      <Card className="mtop">
        <CardTitle>Достижения</CardTitle>
        <CardText>
          Открыто: <strong>{unlockedCount}</strong> из <strong>{totalCount}</strong>. Листай →
        </CardText>

        <div
          style={{
            display: 'flex',
            gap: 10,
            overflowX: 'auto',
            paddingTop: 8,
            paddingBottom: 6,
            marginTop: 8,
          }}
        >
          {ACHIEVEMENTS.map((a) => {
            const unlocked = achievements.includes(a.id)

            return (
              <button
                key={a.id}
                onClick={() => onOpenAchievement(a.id)}
                style={{
                  minWidth: 190,
                  textAlign: 'left',
                  padding: 12,
                  borderRadius: 14,
                  border: '1px solid rgba(0,0,0,0.08)',
                  background: unlocked ? 'white' : 'rgba(0,0,0,0.03)',
                  opacity: unlocked ? 1 : 0.65,
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800 }}>
                  {unlocked ? '🏆 ' : '🔒 '}
                  {a.title}
                </div>

                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>{a.desc}</div>

                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 10 }}>
                  Статус: {unlocked ? 'открыто' : 'закрыто'}
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Главный CTA */}
      <div style={{ marginTop: 16 }}>
        <h2>Что дальше?</h2>
        <button onClick={onGoLectures}>Продолжить путь</button>
      </div>

      {/* Миссия дня */}
      <Card className="mtop">
        <CardTitle>Миссия дня</CardTitle>
        <CardText>Попробуй выполнить задание и отметь результат.</CardText>

        <div className="mtop">
          <div style={{ fontWeight: 700 }}>{missionText ?? 'Пока нет миссии'}</div>

          {/* ✅ мини-чеклист (появится если миссия создана из наблюдения кухни) */}
          {missionText && missionStatus !== 'done' && miniSteps.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Мини-уборка: отметь 3 пункта из 4</div>

              <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                {miniSteps.map((s) => {
                  const checked = !!miniChecklist[s.id]
                  return (
                    <label
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: 10,
                        borderRadius: 12,
                        border: '1px solid rgba(0,0,0,0.08)',
                        background: checked ? 'rgba(0,0,0,0.03)' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onToggleMiniStep(s.id, e.target.checked)}
                      />
                      <span style={{ fontSize: 13 }}>{s.text}</span>
                    </label>
                  )
                })}
              </div>

              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                Выполнено: {checkedCount} / {miniSteps.length}
              </div>
            </div>
          )}

          {missionText && missionStatus === 'active' && (
            <div className="row mtop">
              <Button onClick={onAcceptMission}>Я сделаю</Button>
              <Button variant="ghost" onClick={onPostponeMission}>
                Позже
              </Button>
            </div>
          )}

          {missionText && missionStatus === 'accepted' && (
            <div
              className="row mtop"
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}
            >
              <Button onClick={onCompleteMission} disabled={!canCompleteMini}>
                Выполнил ✅
              </Button>

              {!canCompleteMini && miniSteps.length > 0 && (
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  Отметь ещё {Math.max(0, 3 - checkedCount)} пункт(а), чтобы завершить миссию.
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default HomeScreen
