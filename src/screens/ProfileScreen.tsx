import { type ProfileState, xpProgress, roleTitle, ACHIEVEMENTS } from '../data/progression'

type Props = { profile: ProfileState }

export default function ProfileScreen({ profile }: Props) {
  const { value, need, left } = xpProgress(profile)
  const percent = Math.min(100, (value / need) * 100)

  return (
    <div style={{ padding: 16 }}>
      <h1>Профиль</h1>

      {/* Верхняя карточка */}
      <div
        style={{
          marginTop: 12,
          padding: 16,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
          display: 'grid',
          gap: 10,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.name}</div>
        <div style={{ opacity: 0.85 }}>
          Роль: <strong>{roleTitle(profile.roleLevel)}</strong> (уровень {profile.roleLevel})
        </div>

        <div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {profile.roleLevel >= 10 ? (
              <strong>Максимальный уровень</strong>
            ) : (
              <>
                До следующего уровня: <strong>{left} XP</strong> ({value}/{need})
              </>
            )}
          </div>

          <div
            style={{
              height: 10,
              background: '#eee',
              borderRadius: 999,
              marginTop: 6,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: 10,
                width: `${profile.roleLevel >= 10 ? 100 : percent}%`,
                background: '#cfcfcf',
                borderRadius: 999,
              }}
            />
          </div>

          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
            Всего XP: <strong>{profile.xpTotal}</strong>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div
        style={{
          marginTop: 14,
          padding: 16,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Статистика</div>

        <div style={{ display: 'grid', gap: 6, fontSize: 13, opacity: 0.9 }}>
          <div>✅ Тестов пройдено: <strong>{profile.stats.testsDone}</strong></div>
          <div>📚 Лекций завершено: <strong>{profile.stats.lecturesDone}</strong></div>
          <div>🔎 Наблюдений сделано: <strong>{profile.stats.observationsDone}</strong></div>
          <div>🎯 Миссий выполнено: <strong>{profile.stats.missionsDone}</strong></div>
        </div>
      </div>

      {/* Ачивки */}
      <div
        style={{
          marginTop: 14,
          padding: 16,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Ачивки</div>

        <div style={{ display: 'grid', gap: 10 }}>
          {ACHIEVEMENTS.map((a) => {
            const unlocked = profile.achievements.includes(a.id)
            return (
              <div
                key={a.id}
                style={{
                  padding: 12,
                  borderRadius: 14,
                  background: unlocked ? '#f3f3f3' : '#fafafa',
                  opacity: unlocked ? 1 : 0.6,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {unlocked ? '🏅 ' : '🔒 '}
                  {a.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{a.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
