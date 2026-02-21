import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import {
  ACHIEVEMENTS,
  type AchievementId,
  type ProfileState,
  xpProgress,
  roleTitle,
} from '../data/progression'
import type { TodayMission } from '../App'

type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
  onGoPlaceObservation: () => void

  profile: ProfileState

  dailyMission: TodayMission | null
  eventMissions: TodayMission[]
  onCompleteMission: (uid: string) => void

  achievements: AchievementId[]
  onOpenAchievement: (id: AchievementId) => void
}

export default function HomeScreen({
  onGoLectures,
  onGoTests,
  onGoPlaceObservation,
  profile,
  dailyMission,
  eventMissions,
  onCompleteMission,
  achievements,
  onOpenAchievement,
}: HomeScreenProps) {
  const { value, need } = xpProgress(profile)
  const percent = profile.roleLevel >= 10 ? 100 : Math.min(100, (value / need) * 100)

  const unlockedCount = achievements.length
  const totalCount = ACHIEVEMENTS.length

  const renderMission = (m: TodayMission) => (
    <div key={m.uid} className="miniCard soft">
      <div style={{ fontWeight: 900, letterSpacing: '-0.01em' }}>{m.text}</div>

      <div className="row" style={{ marginTop: 10 }}>
        <Button onClick={() => onCompleteMission(m.uid)}>Выполнил (+5 XP)</Button>
      </div>
    </div>
  )

  return (
    <div>
      <h1>Hygiene Level Up</h1>
      <p style={{ marginTop: 6 }}>Привет 🙂</p>

      {/* PROGRESS */}
      <Card className="mtop soft">
        <CardTitle>Твой прогресс</CardTitle>

        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <div className="sectionLabel">Роль</div>
            <div style={{ fontWeight: 900 }}>{roleTitle(profile.roleLevel)}</div>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <div className="sectionLabel">Уровень</div>
            <div style={{ fontWeight: 900 }}>{profile.roleLevel}</div>
          </div>

          <div>
            <div className="sectionLabel">XP</div>

            <div className="progress" style={{ marginTop: 8 }}>
              <div className="progressFill" style={{ width: `${percent}%` }} />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
                gap: 10,
              }}
            >
              <div className="xpChip">
                <span className="xpDot" />
                {profile.roleLevel >= 10 ? 'MAX' : `${value} / ${need} XP`}
              </div>

              <div style={{ fontSize: 12, color: 'var(--muted2)', fontWeight: 900 }}>
                {Math.round(percent)}%
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* NAV */}
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

      {/* ACHIEVEMENTS (GRID) */}
      <Card className="mtop">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
          <CardTitle>Достижения</CardTitle>
          <div className="badge">{unlockedCount} / {totalCount}</div>
        </div>

        <CardText>Собирай коллекцию — открывай новые бейджи.</CardText>

        <div className="divider" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginTop: 10,
          }}
        >
          {ACHIEVEMENTS.map((a) => {
            const unlocked = achievements.includes(a.id)

            return (
              <button
                key={a.id}
                onClick={() => onOpenAchievement(a.id)}
                style={{
                  textAlign: 'left',
                  padding: 14,
                  borderRadius: 16,
                  border: '1px solid rgba(93,169,233,0.18)',
                  background: unlocked ? 'rgba(255,255,255,0.92)' : 'rgba(31,42,55,0.06)',
                  opacity: unlocked ? 1 : 0.62,
                  cursor: 'pointer',
                  boxShadow: unlocked ? '0 10px 22px rgba(93,169,233,0.14)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 13 }}>
                  {unlocked ? '🏆 ' : '🔒 '}
                  {a.title}
                </div>

                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>{a.desc}</div>

                {unlocked && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(220px 140px at 80% 0%, rgba(93,169,233,0.18), transparent 55%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </Card>

      {/* MISSIONS */}
      <Card className="mtop accent">
        <CardTitle>Миссии</CardTitle>

        <div style={{ marginTop: 12 }}>
          <div className="sectionLabel">Дневная</div>

          <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
            {dailyMission ? (
              renderMission(dailyMission)
            ) : (
              <div style={{ fontSize: 13, opacity: 0.8 }}>Пока нет дневной миссии.</div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="sectionLabel">После действий</div>

          <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
            {eventMissions.length > 0 ? (
              eventMissions.map(renderMission)
            ) : (
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Сделай лекцию, тест или наблюдение — появятся миссии.
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}